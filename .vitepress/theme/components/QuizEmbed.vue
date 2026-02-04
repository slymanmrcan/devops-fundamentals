<template>
  <section class="quiz-embed">
    <header class="quiz-embed__header">
      <div>
        <p class="quiz-embed__eyebrow">Quizler</p>
        <h2 class="quiz-embed__title">Aynı sayfada çöz</h2>
        <p class="quiz-embed__subtitle">Bir quiz seç, sorular aşağıda açılır.</p>
      </div>
      <div class="quiz-embed__pill">
        {{ totalCount }} set
      </div>
    </header>

    <div v-if="loading" class="quiz-embed__loading">Yükleniyor...</div>

    <div v-else class="quiz-embed__layout">
      <div v-if="!activeSet" class="quiz-embed__catalog">
        <div v-for="group in groups" :key="group.title" class="quiz-embed__group">
          <div class="quiz-embed__group-title">{{ group.title }}</div>
          <div class="quiz-embed__chips">
            <button
              v-for="key in group.keys"
              :key="key"
              class="quiz-embed__chip"
              type="button"
              @click="startSet(key)"
            >
              {{ sets[key]?.title || key }}
            </button>
          </div>
        </div>
      </div>

      <div v-else class="quiz-embed__player">
        <div class="quiz-embed__player-header">
          <div>
            <div class="quiz-embed__player-title">{{ currentTitle }}</div>
            <div class="quiz-embed__player-subtitle">Tek seçim · 1 puan</div>
          </div>
          <div class="quiz-embed__pill">Soru {{ currentIndex + 1 }}/{{ questions.length }}</div>
        </div>

        <div class="quiz-embed__progress">
          <div class="quiz-embed__progress-bar" :style="{ width: progress + '%' }"></div>
        </div>

        <div v-if="!finished" class="quiz-embed__question">
          {{ currentIndex + 1 }}. {{ currentQuestion?.text }}
        </div>
        <ul v-if="!finished" class="quiz-embed__options">
          <li
            v-for="(opt, index) in currentQuestion?.options"
            :key="index"
            class="quiz-embed__option"
            :class="optionState(index)"
            @click="selectAnswer(index)"
          >
            {{ opt }}
          </li>
        </ul>

        <div v-if="finished" class="quiz-embed__result">
          <div class="quiz-embed__score">{{ scorePercent }}%</div>
          <h3>{{ resultTitle }}</h3>
          <p>{{ resultDetail }}</p>
        </div>

        <div class="quiz-embed__footer">
          <button class="quiz-embed__back" type="button" @click="resetCatalog">Listeye Dön</button>
          <button
            v-if="!finished"
            class="quiz-embed__next"
            type="button"
            :disabled="!answered"
            @click="nextQuestion"
          >
            {{ currentIndex + 1 === questions.length ? 'Testi Bitir' : 'Sonraki Soru' }}
          </button>
          <button
            v-else
            class="quiz-embed__next"
            type="button"
            @click="restart"
          >
            Baştan Başla
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { withBase } from 'vitepress';

const loading = ref(true);
const sets = ref({});
const activeSet = ref(null);
const questions = ref([]);
const currentIndex = ref(0);
const answered = ref(false);
const selectedIndex = ref(null);
const score = ref(0);
const finished = ref(false);

const groups = [
  {
    title: 'Karma (Çok Konu)',
    keys: ['all', 'pro-quiz']
  },
  {
    title: 'Tek Konu',
    keys: [
      'linux-basic',
      'linux-intermediate',
      'linux-advanced',
      'linux-50',
      'docker-basic',
      'docker-intermediate',
      'docker-advanced',
      'git-basic',
      'git-intermediate',
      'git-advanced',
      'network-basic',
      'network-intermediate',
      'network-advanced'
    ]
  }
];

const totalCount = computed(() => Object.keys(sets.value).length || 0);
const currentQuestion = computed(() => questions.value[currentIndex.value] || null);
const currentTitle = computed(() => sets.value[activeSet.value]?.title || 'Quiz');
const progress = computed(() => {
  if (!questions.value.length) return 0;
  return Math.round((currentIndex.value / questions.value.length) * 100);
});
const scorePercent = computed(() => {
  if (!questions.value.length) return 0;
  return Math.round((score.value / questions.value.length) * 100);
});
const resultTitle = computed(() => {
  if (scorePercent.value >= 85) return 'Harika! 🚀';
  if (scorePercent.value >= 65) return 'İyi iş! 👏';
  return 'Tekrar dene! 📚';
});
const resultDetail = computed(() => {
  if (scorePercent.value >= 85) return 'Bu konuyu çok iyi biliyorsun.';
  if (scorePercent.value >= 65) return 'Biraz daha pratikle mükemmel olacak.';
  return 'Kısa bir tekrar sonrası çok daha iyi olacak.';
});

function normalizeQuestion(raw) {
  return {
    text: raw.text || raw.q || '',
    options: raw.options || raw.opts || [],
    answer: Number.isFinite(raw.answer) ? raw.answer : raw.a
  };
}

function ensureData() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    if (window.QUIZ_DATA) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = withBase('/13-Interactive-Quizzes/quiz-data.js');
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('quiz data load failed'));
    document.head.appendChild(script);
  });
}

function startSet(key) {
  activeSet.value = key;
  const rawQuestions = sets.value[key]?.questions || [];
  questions.value = rawQuestions.map(normalizeQuestion);
  currentIndex.value = 0;
  answered.value = false;
  selectedIndex.value = null;
  score.value = 0;
  finished.value = false;
}

function selectAnswer(index) {
  if (answered.value || finished.value) return;
  answered.value = true;
  selectedIndex.value = index;
  if (index === currentQuestion.value?.answer) {
    score.value += 1;
  }
}

function optionState(index) {
  if (!answered.value) return '';
  const answer = currentQuestion.value?.answer;
  if (index === answer) return 'correct';
  if (index === selectedIndex.value) return 'wrong';
  return 'disabled';
}

function nextQuestion() {
  if (currentIndex.value + 1 >= questions.value.length) {
    finished.value = true;
    answered.value = false;
    return;
  }
  currentIndex.value += 1;
  answered.value = false;
  selectedIndex.value = null;
}

function restart() {
  startSet(activeSet.value);
}

function resetCatalog() {
  activeSet.value = null;
  questions.value = [];
  currentIndex.value = 0;
  answered.value = false;
  selectedIndex.value = null;
  score.value = 0;
  finished.value = false;
}

onMounted(async () => {
  try {
    await ensureData();
    if (typeof window !== 'undefined' && window.QUIZ_DATA) {
      sets.value = window.QUIZ_DATA;
    }
  } catch (err) {
    sets.value = {};
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.quiz-embed {
  display: grid;
  gap: 16px;
  margin-top: 12px;
}

.quiz-embed__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 18px 20px;
}

.quiz-embed__eyebrow {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--vp-c-text-3);
  margin-bottom: 4px;
}

.quiz-embed__title {
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0;
}

.quiz-embed__subtitle {
  color: var(--vp-c-text-2);
  margin: 6px 0 0;
}

.quiz-embed__pill {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  font-weight: 700;
  background: var(--vp-c-bg-alt);
}

.quiz-embed__layout {
  display: grid;
  gap: 16px;
}

.quiz-embed__loading {
  padding: 20px;
  border-radius: 12px;
  border: 1px dashed var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.quiz-embed__catalog {
  display: grid;
  gap: 16px;
}

.quiz-embed__group {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 18px;
}

.quiz-embed__group-title {
  font-weight: 700;
  margin-bottom: 12px;
}

.quiz-embed__chips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
}

.quiz-embed__chip {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.12s, border-color 0.12s, color 0.12s;
}

.quiz-embed__chip:hover {
  transform: translateY(-1px);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.quiz-embed__player {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  padding: 18px;
  display: grid;
  gap: 14px;
}

.quiz-embed__player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.quiz-embed__player-title {
  font-weight: 800;
  font-size: 1.1rem;
}

.quiz-embed__player-subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
}

.quiz-embed__progress {
  height: 8px;
  border-radius: 999px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.quiz-embed__progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  transition: width 0.3s ease;
}

.quiz-embed__question {
  font-weight: 700;
  line-height: 1.6;
}

.quiz-embed__options {
  list-style: none;
  display: grid;
  gap: 10px;
}

.quiz-embed__option {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  padding: 12px 14px;
  cursor: pointer;
  transition: border-color 0.12s, transform 0.12s;
}

.quiz-embed__option:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.quiz-embed__option.correct {
  border-color: #00c48c;
  color: #00c48c;
  background: rgba(0, 196, 140, 0.12);
  font-weight: 700;
}

.quiz-embed__option.wrong {
  border-color: #ff7b7b;
  color: #ff7b7b;
  background: rgba(255, 123, 123, 0.12);
}

.quiz-embed__option.disabled {
  opacity: 0.6;
}

.quiz-embed__result {
  text-align: center;
  padding: 20px;
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
}

.quiz-embed__score {
  font-size: 2.4rem;
  font-weight: 900;
  color: var(--vp-c-brand-1);
}

.quiz-embed__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.quiz-embed__back {
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-weight: 600;
  cursor: pointer;
}

.quiz-embed__next {
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: #03131a;
  font-weight: 700;
  cursor: pointer;
}

.quiz-embed__next:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .quiz-embed__header,
  .quiz-embed__player-header,
  .quiz-embed__footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .quiz-embed__next {
    width: 100%;
    text-align: center;
  }
}
</style>
