import AbstractView from './abstract-view';

export default class ArtistScreenView extends AbstractView {
  constructor(state, currentLevelData, tracks) {
    super();

    this.state = state;
    this.tracks = tracks;
    this.currentLevelData = currentLevelData;
  }

  get template() {
    return (`
      <section class="main main--level main--level-artist">
        <div class="main-wrap">
         <h2 class="title main-title">${this.currentLevelData.question}</h2>
          <div class="player-wrapper">
            <div class="player">
              <button class="player-control" data-url="${this.currentLevelData.src}"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <form class="main-list">
            ${this.answers}
          </form>
        </div>   
      </section>
    `);
  }

  get answers() {
    return this.currentLevelData.answers
        .map((answer, index) => `
          <div class="main-answer-wrapper">
            <input class="main-answer-r" type="radio" id="artist-${index}" name="answer" value="${index}">
            <label class="main-answer" for="artist-${index}">
              <img 
                class="main-answer-preview"
                src="${answer.image.url}"
                alt="${answer.title}" 
                width="${answer.image.width}" 
                height="${answer.image.height}" 
              >
              ${answer.title}
            </label>
          </div>
        `)
        .join(``);
  }

  _controlPlayerClickHandler(controlButton) {
    controlButton.addEventListener(`click`, (event) => {
      event.preventDefault();

      const audioUrl = event.target.getAttribute(`data-url`);
      for (const track of this.tracks) {
        if (track.src === audioUrl) {
          if (!track.paused) {
            track.pause();
          } else {
            track.play();
          }
        }
      }

      controlButton.classList.toggle(`player-control--pause`);
    });
  }

  _stopAllTracks() {
    for (const track of this.tracks) {
      track.pause();
    }
  }

  sendAnswerClickHandler() {}

  bind() {
    const controlButton = this.element.querySelector(`.player .player-control`);

    this._controlPlayerClickHandler(controlButton);

    const artistsAnswer = this.element.querySelectorAll(`.main-answer-wrapper`);
    artistsAnswer.forEach((answer) => {
      answer.addEventListener(`change`, (event) => {
        this._stopAllTracks();
        const isCorrect = this.currentLevelData.answers[event.target.value].isCorrect;
        this.sendAnswerClickHandler(isCorrect);
      });
    });
  }
}
