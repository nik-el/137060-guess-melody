import ResultView from './views/result-view';
import {game} from '../data/game-model';
import {renderScreen} from '../service/template';

export default (state, userAnswers) => {
  const resultScreen = new ResultView(state, userAnswers);

  resultScreen.replayGameHandler = () => {
    game.resetGame();
  };

  renderScreen(resultScreen.element);
};
