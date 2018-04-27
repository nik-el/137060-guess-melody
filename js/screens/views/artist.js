import AbstractView from './abstract-view';
import Header from './header';

export default class ArtistScreenView extends AbstractView {
  constructor(state, currentLevelData) {
    super();

    this.state = state;
    this.currentLevelData = currentLevelData;
    this.header = new Header(this.state);
  }

  get template() {
    return (`
      <section class="main main--level main--level-artist">
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
        </svg>
        <div>
          ${this.header.template}
        </div>  
        <div class="main-wrap">
         <h2 class="title main-title">Кто исполняет эту песню?</h2>
          <div class="player-wrapper">
            <div class="player">
              <audio src="${this.currentLevelData.track}"></audio>
              <button class="player-control player-control--pause"></button>
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

  onAnswerSelected() {}

  bind() {
    const artistsAnswer = this.element.querySelectorAll(`.main-answer-wrapper`);
    artistsAnswer.forEach((answer) => {
      answer.addEventListener(`change`, (event) => this.onAnswerSelected(event.target.value));
    });
  }
}
