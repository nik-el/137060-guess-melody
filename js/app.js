import GameModel from './data/game-model';
import GamePresenter from './data/game-presenter';

import WelcomeView from './views/welcome-view';
import ResultView from './views/result-view';

const appContent = document.querySelector(`.app`);

const changeView = (node) => {
  const screenContent = appContent.querySelector(`section.screen`);
  if (screenContent) {
    appContent.innerHTML = ``;
  }

  appContent.insertBefore(node, appContent.firstChild);
};

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeView();
    welcome.startNewGameHandler = () => {
      this.showGame();
    };

    changeView(welcome.element);
  }

  static showGame() {
    const gameScreen = new GamePresenter(new GameModel());
    gameScreen.isOver = (state, userAnswer) => {
      this.showResult(state, userAnswer);
    };
    changeView(gameScreen.element);
    gameScreen.initGame();
  }

  static showResult(state, userAnswer) {
    const results = new ResultView(state, userAnswer);
    results.replayGameHandler = () => {
      this.showWelcome();
    };
    changeView(results.element);
  }

}
