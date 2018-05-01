import AbstractView from './abstract-view';
import Header from './header-view';

export default class GenreScreenView extends AbstractView {
  constructor(state, currentLevelData) {
    super();

    this.state = state;
    this.currentLevelData = currentLevelData;
  }

  get template() {
    return (`
      <section class="main main--level main--level-genre">
      <div class="main-wrap">
        <h2 class="title">Выберите ${this.currentLevelData.genre} треки</h2>
        <form class="genre">
          ${this.answers}
        </form>
        <button class="genre-answer-send" type="submit" disabled="">Ответить</button>
      </div>
    </section>
    `);
  }

  get answers() {
    return this.currentLevelData.answers
        .map(({src}, index) => (
          `<div class="genre-answer">
              <div class="player-wrapper">
                <div class="player">
                  <audio src="${src}" class="audio-track"></audio>
                  <button class="player-control player-control--play"></button>
                  <div class="player-track">
                    <span class="player-status"></span>
                  </div>
                </div>
              </div>
              <input type="checkbox" name="answer" value="${index}" id="a-${index}">
              <label class="genre-answer-check" for="a-${index}"></label>
            </div>
          `))
        .join(``);
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

    sendAnswer.addEventListener(`click`, () =>{
      const checkedAnswersValue =
        Array
            .from(this.element.querySelectorAll(`input[name=answer]:checked`))
            .map(({value}) => value);
      this.sendAnswerClickHandler(checkedAnswersValue);
    });
  }
}
