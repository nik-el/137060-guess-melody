import AbstractView from './abstract-view';
import gameStateTemplate from '../template/state';
import gameGenreTemplate from '../template/genre';

export default class GenreScreenView extends AbstractView {
  constructor(state, level) {
    super();
    this.state = state;
    this.level = level;
  }

  get template() {
    return (`
      <section class="main main--level main--level-genre">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      </svg>
      <div>
        ${gameStateTemplate(this.state)}
      </div>
      <div class="main-wrap">
        ${gameGenreTemplate(this.level)}
      </div>
    </section>
    `);
  }

  _chooseAnswerClickHandler(send, answers) {
    send.disabled = true;
    for (const answer of answers) {
      if (answer.checked) {
        send.disabled = false;
      }
    }
  }

  _resetForm(button, form) {
    button.disabled = true;
    form.reset();
  }

  sendAnswerClickHandler() {
  }

  bind() {
    const genreForm = this.element.querySelector(`.genre`);
    const genresAnswer = this.element.querySelectorAll(`.genre-answer input`);
    const sendAnswer = this.element.querySelector(`.genre-answer-send`);

    this._resetForm(sendAnswer, genreForm);

    genresAnswer.forEach((answer) => {
      answer.addEventListener(`click`, () => {
        this._chooseAnswerClickHandler(sendAnswer, genresAnswer);
      });
    });

    sendAnswer.addEventListener(`click`, this.sendAnswerClickHandler);
  }
}
