import AbstractView from './abstract-view';
import resultTemplate from '../template/result';

export default class resultScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return (`
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию">
        <h1>Угадай мелодию</h1>
      </section>
      ${resultTemplate(this.state)}
    </section>
  `);
  }

  replayGameHandler() {
  }

  bind(element) {
    const replayGame = element.querySelector(`.main-replay`);
    replayGame.addEventListener(`click`, this.replayGameHandler);
  }
}

