import WelcomeView from './views/welcome';
import {game} from '../data/gameData';
import {renderScreen} from '../service/template';

export default () => {
  const welcomeScreen = new WelcomeView();

  welcomeScreen.startNewGameHandler = () => {
    game.renderGameScreen();
  };

  renderScreen(welcomeScreen.element);
};
