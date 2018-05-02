import GameModel from './game/game-model';
import GamePresenter from './game/game-presenter';
import WelcomeView from './views/welcome-view';
import ResultView from './views/result-view';

const appContent = document.querySelector(`.app`);

const changeView = (node) => {
  const screenContent = appContent.querySelector(`section.screen`);
  if (screenContent) {
    appContent.removeChild(screenContent);
  }
  const newScreenContent = document.createElement(`section`);
  newScreenContent.className = `screen`;
  newScreenContent.appendChild(node);
  appContent.insertBefore(newScreenContent, appContent.firstChild);
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Application {

  static showWelcome() {
    const welcome = new WelcomeView();
    welcome.startNewGameHandler = () => {
      Application.showGame();
    };

    changeView(welcome.element);
  }

  static showGame() {
    const gameScreen = new GamePresenter(new GameModel());
    gameScreen.isOver = (state, userAnswer) => {
      Application.showResult(state, userAnswer);
    };
    changeView(gameScreen.element);
    gameScreen.initGame();
  }

  static showResult(state, userAnswer) {
    const results = new ResultView(state, userAnswer);
    results.replayGameHandler = () => {
      Application.showWelcome();
    };
    changeView(results.element);
  }

}
