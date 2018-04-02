import {getElementFromTemplate} from '../service';
import {startNewGame} from '../service';

const failByTimeResultTemplate = `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;

const failByTimeResultNode = getElementFromTemplate(failByTimeResultTemplate);

const replay = failByTimeResultNode.querySelector(`.main-replay`);

replay.addEventListener(`click`, startNewGame);

export default failByTimeResultNode;
