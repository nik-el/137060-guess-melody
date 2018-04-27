import AbstractView from './abstract-view';
import Header from './header';
import GenreAnswers from './genre-answers';

export default class GenreScreenView extends AbstractView {
  constructor(state, currentLevelData) {
    super();

    this.state = state;
    this.currentLevelData = currentLevelData;
    this.header = new Header(this.state);
    this.genreAnswers = new GenreAnswers(this.currentLevelData.answers);
  }

  get template() {
    return (`
      <section class="main main--level main--level-genre">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      </svg>
      <div>
          ${this.header.template}
      </div>
      <div class="main-wrap">
        <h2 class="title">Выберите ${this.currentLevelData.genre} треки</h2>
        <form class="genre">
          ${this.genreAnswers.template}
        </form>
        <button class="genre-answer-send" type="submit" disabled="">Ответить</button>
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

  sendAnswerClickHandler() {}

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
