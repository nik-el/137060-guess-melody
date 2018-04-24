import AbstractView from '../abstract-view';
import {getElementFromTemplate, renderScreen} from '../service/template';
import resultTemplate from '../template/result';
import {resetGame} from '../service/game';

export default class resultScreenView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;

  }

  get template() {
    return (`
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию">
        <h1>Угадай мелодию</h1>
      </section>
      ${resultTemplate(this.game)}
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

// export default (game) => {
//   const screenContainer = getElementFromTemplate(`
//   <section class="main main--result">
//     <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
//     ${resultTemplate(game)}
//   </section>
//   `);
//
//   const renderedContainer = renderScreen(screenContainer);
//   const replayGame = renderedContainer.querySelector(`.main-replay`);
//
//   replayGame.addEventListener(`click`, () => {
//     resetGame(game);
//   });
// };


