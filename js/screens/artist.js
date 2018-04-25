import ArtistView from './views/artist';
import {game} from '../data/gameData';
import {renderScreen} from "../service/template";

export default (state, level) => {
  const levelData = game.getCurrentLevelData(level);
  const artistScreen = new ArtistView(game.state, levelData);

  artistScreen.onAnswerSelected = (event) => {

    const checkedAnswer = levelData.answers[event.target.value].isCorrect;
    game.getAnswer(checkedAnswer);
    game.changeLevel();
    game.renderGameScreen();
  };

  renderScreen(artistScreen.element);
  return artistScreen.element;
};

