import WelcomeView from './views/welcome-view';
import {game} from '../data/game-model';
import {renderScreen} from '../service/template';

export default () => {
  const welcomeScreen = new WelcomeView();

  welcomeScreen.startNewGameHandler = () => {
    game.renderGameScreen();
  };

  renderScreen(welcomeScreen.element);
};
