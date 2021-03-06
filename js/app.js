import GameModel from './game/game-model';
import GamePresenter from './game/game-presenter';
import WelcomeView from './views/welcome-view';
import ResultView from './views/result-view';
import ErrorView from './views/error-view';
import SplashScreen from './views/splash-view';
import Loader from './loader';

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

export default class Application {
  static start() {
    const splash = new SplashScreen();
    changeView(splash.element);
    Loader.loadData()
        .then((questions) => Loader.loadAllTracks(questions))
        .then((data) => Application.showWelcome(data))
        .catch(Application.showError);
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

    gameScreen.isOver = (state, userAnswer, questions, tracks, successGame) => {
      if (successGame) {
        Loader.saveResults(state)
            .then(() => Loader.loadResults())
            .then((results) => Application.showResult(state, userAnswer, questions, tracks, results))
            .catch(Application.showError);
      } else {
        Application.showResult(state, userAnswer, questions, tracks);
      }
    };
    changeView(gameScreen.element);
    gameScreen.initGame();
  }

  static showResult(state, userAnswer, questions, tracks, resultsAnsers) {
    const results = new ResultView(state, userAnswer, resultsAnsers);
    results.replayGameHandler = () => {
      Application.showGame({questions, tracks});
    };
    changeView(results.element);
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    changeView(errorView.element);
  }

}
