import {getElementFromTemplate, renderScreen} from '../service/commonService';
import resultTemplate from '../service/resultService';
import {resetGame} from '../service/gameService';

export default () => {
  const screenContainer = getElementFromTemplate(`
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    ${resultTemplate()}
  </section>
  `);

  const renderedContainer = renderScreen(screenContainer);
  const replayGame = renderedContainer.querySelector(`.main-replay`);

  replayGame.addEventListener(`click`, resetGame);
};


