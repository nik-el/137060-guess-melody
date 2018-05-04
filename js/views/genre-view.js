import AbstractView from './abstract-view';

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
                  <audio src="${src}" class="audio-${index}"></audio>
                  <button class="player-control player-control-${index} player-control--play "></button>
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

  _stopAllTracks() {
    const players = this.element.querySelectorAll(`.player`);

    for (const player of players) {
      const control = player.querySelector(`.player-control`);
      control.classList.remove(`player-control--pause`);

      const track = player.querySelector(`audio`);
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

    controlButtons.forEach((button, index) => {
      button.addEventListener(`click`, (event) => {
        event.preventDefault();

        if (!tracks[index].paused) {
          tracks[index].pause();
        } else {
          this._stopAllTracks();
          tracks[index].play();
        }

        button.classList.toggle(`player-control--pause`);
      });
    });

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
