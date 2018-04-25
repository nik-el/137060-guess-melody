import ResultView from './views/result';
import {game} from '../data/gameData';
import {renderScreen} from "../service/template";

export default () => {
  const resultScreen = new ResultView(game.state);
  resultScreen.replayGameHandler = () =>{
    game.resetGame();
  };

  renderScreen(resultScreen.element);
  return resultScreen.element;
};
