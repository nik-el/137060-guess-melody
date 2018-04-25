import AbstractView from './abstract-view';
import gameStateTemplate from '../template/state';
import gameArtistTemplate from '../template/artist';

export default class ArtistScreenView extends AbstractView {
  constructor(state, level) {
    super();

    this.state = state;
    this.level = level;
  }

  get template() {
    return (`
      <section class="main main--level main--level-artist">
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
        </svg>
        <div>
          ${gameStateTemplate(this.state)}
        </div>  
        <div class="main-wrap">
          ${gameArtistTemplate(this.level)}
        </div>   
      </section>
    `);
  }

  onAnswerSelected() {
  }

  bind() {
    const artistsAnswer = this._element.querySelectorAll(`.main-answer-wrapper`);
    artistsAnswer.forEach((answer) => {
      answer.addEventListener(`change`, this.onAnswerSelected);
    });
  }
}
