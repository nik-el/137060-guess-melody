import AbstractView from './abstract-view';
import getTextResult from '../service/get-text-result';
import {
  getTimerFormat,
  getFastAnswers,
  getCorrectMinutesText,
  getCorrectSecondsText,
  getCorrectScoreText,
  getCorrectFastAnswerText,
  getCorrectMistakesText,
} from '../helpers';
import {GameRules} from '../game/game-data';

export default class ResultScreenView extends AbstractView {
  constructor(state, userAnswers, resultsAnswers) {
    super();

    this.state = state;
    this.resultsAnswers = resultsAnswers;
    this.userAnswers = userAnswers;
  }

  get template() {
    return (`
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию">
        <h1>Угадай мелодию</h1>
      </section>
      ${this.getResultTemplate()}
    </section>
  `);
  }

  getOverMistakesResult() {
    return `
        <h2 class="title">Какая жалость!</h2>
        <div class="main-stat">${getTextResult(this.state, [])}</div>
        <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>    
      `;
  }

  getOverTimeResult() {
    return `
        <h2 class="title">Увы и ах!</h2>
        <div class="main-stat">${getTextResult(this.state, [])}</div>
        <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>    
      `;
  }

  getWinResult() {
    const currentTime = getTimerFormat(this.state.time);

    const textMinutes = getCorrectMinutesText(currentTime.minutes);
    const textSeconds = getCorrectSecondsText(currentTime.seconds);
    const textScore = getCorrectScoreText(this.state.score);
    const textFastAnswer = getCorrectFastAnswerText(getFastAnswers(this.userAnswers));
    const textMistakes = getCorrectMistakesText(this.state.mistakes);

    return `
        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">
          За ${textMinutes}
          и  ${textSeconds}
          <br>вы&nbsp;набрали ${textScore}
          (${textFastAnswer})
          <br>совершив ${textMistakes}
        </div>
        <span class="main-comparison">${getTextResult(this.state, this.resultsAnswers)}</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      `;
  }

  getResultTemplate() {
    if (this.state.mistakes > GameRules.AVAILABLE_MISTAKES) {
      return this.getOverMistakesResult();
    } else if (!this.state.time) {
      return this.getOverTimeResult();
    }

    return this.getWinResult();
  }

  replayGameHandler() {}

  bind() {
    const replayGame = this.element.querySelector(`.main-replay`);
    replayGame.addEventListener(`click`, () => this.replayGameHandler());
  }
}

