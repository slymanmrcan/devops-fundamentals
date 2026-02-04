(function () {
  const data = window.QUIZ_DATA || {};
  const params = new URLSearchParams(window.location.search);
  const setKey = params.get('set');

  const catalogPanel = document.getElementById('catalog-panel');
  const quizPanel = document.getElementById('quiz-panel');
  const catalog = document.getElementById('catalog');
  const quizTitle = document.getElementById('quiz-title');
  const quizSubtitle = document.getElementById('quiz-subtitle');
  const quizPill = document.getElementById('quiz-pill');
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const nextBtn = document.getElementById('next');
  const progressEl = document.getElementById('progress');
  const resultEl = document.getElementById('result');
  const resultTitle = document.getElementById('result-title');
  const resultDetail = document.getElementById('result-detail');
  const scoreEl = document.getElementById('score');
  const quizBody = document.getElementById('quiz-body');
  const quizFooter = document.getElementById('quiz-footer');
  const restartBtn = document.getElementById('restart');

  const catalogGroups = [
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

  function normalizeQuestion(raw) {
    return {
      text: raw.text || raw.q || '',
      options: raw.options || raw.opts || [],
      answer: Number.isFinite(raw.answer) ? raw.answer : raw.a
    };
  }

  function showCatalog() {
    catalogPanel.style.display = 'flex';
    quizPanel.style.display = 'none';
    catalog.innerHTML = '';

    catalogGroups.forEach((group) => {
      const items = group.keys.filter((key) => data[key]);
      if (!items.length) return;

      const wrap = document.createElement('div');
      wrap.className = 'catalog-group';
      const title = document.createElement('h2');
      title.textContent = group.title;
      const links = document.createElement('div');
      links.className = 'catalog-links';

      items.forEach((key) => {
        const item = data[key];
        const link = document.createElement('a');
        link.href = `./quiz.html?set=${encodeURIComponent(key)}`;
        link.textContent = item.title || key;
        links.appendChild(link);
      });

      wrap.appendChild(title);
      wrap.appendChild(links);
      catalog.appendChild(wrap);
    });
  }

  function startQuiz(key) {
    const set = data[key];
    if (!set) {
      showCatalog();
      return;
    }

    const questions = (set.questions || []).map(normalizeQuestion);

    if (!questions.length) {
      showCatalog();
      return;
    }

    catalogPanel.style.display = 'none';
    quizPanel.style.display = 'flex';
    quizTitle.textContent = set.title || 'Quiz';
    quizSubtitle.textContent = 'Tek seçim · 1 puan';

    let index = 0;
    let score = 0;
    let answered = false;

    function renderQuestion() {
      answered = false;
      const current = questions[index];
      questionEl.textContent = `${index + 1}. ${current.text}`;
      quizPill.textContent = `Soru ${index + 1}/${questions.length}`;
      progressEl.style.width = `${(index / questions.length) * 100}%`;
      optionsEl.innerHTML = '';
      nextBtn.disabled = true;

      current.options.forEach((opt, i) => {
        const li = document.createElement('li');
        li.className = 'option';
        li.textContent = opt;
        li.onclick = () => checkAnswer(li, i, current.answer);
        optionsEl.appendChild(li);
      });
    }

    function checkAnswer(el, chosen, answer) {
      if (answered) return;
      answered = true;
      const opts = optionsEl.querySelectorAll('.option');
      opts.forEach((o) => o.classList.add('disabled'));
      if (chosen === answer) {
        el.classList.add('correct');
        score++;
      } else {
        el.classList.add('wrong');
        if (opts[answer]) opts[answer].classList.add('correct');
      }
      nextBtn.disabled = false;
    }

    function showResult() {
      quizBody.style.display = 'none';
      quizFooter.style.display = 'none';
      resultEl.style.display = 'flex';
      progressEl.style.width = '100%';

      const pct = Math.round((score / questions.length) * 100);
      scoreEl.textContent = `${pct}%`;
      if (pct >= 85) {
        resultTitle.textContent = 'Harika! 🚀';
        resultDetail.textContent = 'Bu konuyu çok iyi biliyorsun.';
      } else if (pct >= 65) {
        resultTitle.textContent = 'İyi iş! 👏';
        resultDetail.textContent = 'Biraz daha pratikle mükemmel olacak.';
      } else {
        resultTitle.textContent = 'Tekrar dene! 📚';
        resultDetail.textContent = 'Kısa bir tekrar sonrası çok daha iyi olacak.';
      }
    }

    nextBtn.addEventListener('click', () => {
      index++;
      if (index < questions.length) {
        renderQuestion();
      } else {
        showResult();
      }
    });

    restartBtn.addEventListener('click', () => {
      window.location.href = `./quiz.html?set=${encodeURIComponent(key)}`;
    });

    renderQuestion();
  }

  if (!setKey) {
    showCatalog();
  } else {
    startQuiz(setKey);
  }
})();
