import renderWelcomeScreen from '../screens/welcome';
import renderGenreScreen from '../screens/genre';
import renderArtistScreen from '../screens/artist';
import renderResultScreen from '../screens/result';
import getScore from './getScore';

const renderGameScreen = (game) => {
  const levelType = game.getCurrentLevelData().type;

  if (levelType === `result`) {
    game.state.score = getScore(game.currentAnswers, game.state.mistakes);
    renderResultScreen(game);
  } else if (levelType === `artist`) {
    renderArtistScreen(game);
  } else if ((levelType === `genre`)) {
    renderGenreScreen(game);
  }
};


const resetGame = (game) => {
  game.resetGame();
  debugger;
  renderWelcomeScreen(game);
};

export {renderGameScreen, resetGame};
