import AbstractView from './abstract-view';

export default class ArtistScreenView extends AbstractView {
  constructor(state, currentLevelData) {
    super();

    this.state = state;
    this.currentLevelData = currentLevelData;
  }

  get template() {
    return (`
      <section class="main main--level main--level-artist">
     
        <div class="main-wrap">
         <h2 class="title main-title">Кто исполняет эту песню?</h2>
          <div class="player-wrapper">
            <div class="player">
              <audio src="${this.currentLevelData.track}" class="audio-track"></audio>
              <button class="player-control"></button>
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
                src="${answer.img}"
                alt="${answer.artist}" 
                width="134" 
                height="134"
              >
              ${answer.artist}
            </label>
          </div>
        `)
        .join(``);
  }

  sendAnswerClickHandler() {}

  bind() {
    const audioControl = this.element.querySelector(`.player-control`);
    const audioTrack = this.element.querySelector(`.audio-track`);

    audioControl.addEventListener(`click`, () => {
      if (audioControl.classList.contains(`player-control--pause`)) {
        audioControl.classList.remove(`player-control--pause`);
        audioTrack.pause();
      } else {
        audioControl.classList.add(`player-control--pause`);
        audioTrack.play();
      }
    });

    const artistsAnswer = this.element.querySelectorAll(`.main-answer-wrapper`);
    artistsAnswer.forEach((answer) => {
      answer.addEventListener(`change`, (event) => {
        this.sendAnswerClickHandler(event.target.value);
      });
    });
  }
}
