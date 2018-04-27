import ResultView from './views/result';
import {game} from '../data/gameData';
import {renderScreen} from '../service/template';

export default (state, userAnswers) => {
  const resultScreen = new ResultView(state, userAnswers);

  resultScreen.replayGameHandler = () => {
    game.resetGame();
  };

  renderScreen(resultScreen.element);
};
