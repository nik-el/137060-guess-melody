import AbstractView from './abstract-view';
import {getCorrectMistakesTimeText, getCorrectMinutesText, getCorrectSecondsText, getTimerFormat} from '../helpers';
import {GameRules, INITIAL_STATE} from '../game/game-data';

const textMistakesTime = getCorrectMistakesTimeText(GameRules.AVAILABLE_MISTAKES);
const initialTime = getTimerFormat(INITIAL_STATE.time);

const textMinutes = getCorrectMinutesText(initialTime.minutes);
const textSeconds = initialTime.seconds ? getCorrectSecondsText(initialTime.seconds) : ``;

export default class WelcomeScreenView extends AbstractView {

  get template() {
    return `
      <section class="main main--welcome">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
        <button class="main-play">Начать игру</button>
        <h2 class="title main-title">Правила игры</h2>
        <p class="text main-text">
          Правила просты&nbsp;— за&nbsp;${textMinutes} ${textSeconds} ответить на все вопросы.<br>
          Ошибиться можно ${textMistakesTime}.<br>
          Удачи!
        </p>
      </section>
    `;
  }

  startNewGameHandler() {}

  bind() {
    const playNewGame = this.element.querySelector(`.main-play`);

    playNewGame.addEventListener(`click`, () => {
      this.startNewGameHandler();
    });
  }
}
