import AbstractView from './abstract-view';

export default class GenreScreenView extends AbstractView {
  constructor(state, currentLevelData, tracks) {
    super();

    this.state = state;
    this.tracks = tracks;
    this.currentLevelData = currentLevelData;
  }

  get template() {
    return (`
      <section class="main main--level main--level-genre">
      <div class="main-wrap">
        <h2 class="title">${this.currentLevelData.question}</h2>
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
                  <button class="player-control player-control-${index} player-control--play " data-url="${src}"></button>
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
    answers.forEach((answer) => {
      answer.addEventListener(`click`, () => {
        send.disabled = true;
        if (answer.checked) {
          send.disabled = false;
        }
      });
    });
  }

  _checkAnswer(answersIndex) {
    let isCorrectAnswer = true;
    answersIndex.forEach((index) =>{
      if (!this.currentLevelData.answers[index].isCorrect) {
        isCorrectAnswer = false;
      }
    });
    return isCorrectAnswer;
  }

  _resetForm(button, form) {
    button.disabled = true;
    form.reset();
  }

  _controlPlayerClickHandler(controlButtons) {
    controlButtons.forEach((button) => {
      button.addEventListener(`click`, (event) => {
        event.preventDefault();

        const audioUrl = event.target.getAttribute(`data-url`);

        for (const track of this.tracks) {
          if (track.src === audioUrl) {
            if (!track.paused) {
              track.pause();
            } else {
              this._stopAllTracks(controlButtons);
              track.play();
            }
            button.classList.toggle(`player-control--pause`);
            return;
          }
        }

      });
    });
  }

  _stopAllTracks(controlButtons) {
    for (const control of controlButtons) {
      control.classList.remove(`player-control--pause`);
    }

    for (const track of this.tracks) {
      track.pause();
    }
  }

  sendAnswerClickHandler() {}

  bind() {
    const genreForm = this.element.querySelector(`.genre`);
    const genresAnswer = this.element.querySelectorAll(`.genre-answer input`);
    const sendAnswer = this.element.querySelector(`.genre-answer-send`);
    const controlButtons = this.element.querySelectorAll(`.player .player-control`);
    const tracks = this.element.querySelectorAll(`audio`);

    this._resetForm(sendAnswer, genreForm);
    this._controlPlayerClickHandler(controlButtons, tracks);
    this._chooseAnswerClickHandler(sendAnswer, genresAnswer);

    sendAnswer.addEventListener(`click`, () => {
      const checkedAnswersValue =
        Array
            .from(this.element.querySelectorAll(`input[name=answer]:checked`))
            .map(({value}) => value);
      this._stopAllTracks(controlButtons);
      const isCorrect = this._checkAnswer(checkedAnswersValue);
      this.sendAnswerClickHandler(isCorrect);
    });
  }
}
