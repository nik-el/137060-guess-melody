import GameModel from './game/game-model';
import GamePresenter from './game/game-presenter';
import WelcomeView from './views/welcome-view';
import ResultView from './views/result-view';
import {adaptServerData} from './game/game-adapter';

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
  static start() {
    window.fetch(`https://es.dump.academy/guess-melody/questions`)
        .then(checkStatus)
        .then((response) => response.json())
        .then((data)=>adaptServerData(data))
        .then((data)=>Application.showWelcome(data));
  }

  static showWelcome(data) {
    const welcome = new WelcomeView();
    welcome.startNewGameHandler = () => {
      Application.showGame(data);
    };

    changeView(welcome.element);
  }

  static showGame(data) {
    const gameScreen = new GamePresenter(new GameModel(data));
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
