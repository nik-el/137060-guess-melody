import AbstractView from '../abstract-view';
import {getElementFromTemplate, renderScreen} from '../service/template';
import {renderGameScreen} from '../service/game';

export default class welcomeScreenView extends AbstractView{
  constructor(game) {
    this.game = game;
    super();
  }

  get template() {
    return (`
      <section class="main main--welcome">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
        <button class="main-play">Начать игру</button>
        <h2 class="title main-title">Правила игры</h2>
        <p class="text main-text">
          Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
          Ошибиться можно 3 раза.<br>
          Удачи!
        </p>
      </section>
    `);
  }

  startNewGameHandler() {
  }

  bind(element) {
    const playNewGame = element.querySelector(`.main-play`);

    playNewGame.addEventListener(`click`, () => {
      event.stopPropagation();
      event.preventDefault();

      this.startNewGameHandler();
    });
  }

  // const renderedContainer = renderScreen(screenContainer);
}
