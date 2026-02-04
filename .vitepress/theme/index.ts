import DefaultTheme from 'vitepress/theme';
import QuizEmbed from './components/QuizEmbed.vue';
import './custom.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('QuizEmbed', QuizEmbed);
  }
};
