import GameModel from './data/game-model';
import GamePresenter from './data/game-presenter';

import WelcomeView from './screens/views/welcome-view';
// import ResultView from './screens/views/result-view';

const app = document.querySelector(`.app`);

const changeView = (node) => {
  const screenContent = app.querySelector(`section.screen`);
  if (screenContent) {
    app.removeChild(screenContent);
  }
  app.insertBefore(node, app.firstChild);
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
    gameScreen.isOver = () => {
      // this.showResult(stats);
    };
    changeView(gameScreen.element);
    gameScreen.startTimer();
  }
  //
  // static showResult() {
  // }

}
