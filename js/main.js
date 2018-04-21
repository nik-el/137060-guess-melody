import renderWelcomeScreen from './screens/welcome';
import {Game} from './data/gameData';

const game = new Game();
renderWelcomeScreen(game);
