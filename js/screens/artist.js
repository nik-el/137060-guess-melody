import ArtistView from './views/artist';
import {game} from '../data/gameData';
import {renderScreen} from "../service/template";

export default (state, currentLevelData) => {
  const artistScreen = new ArtistView(state, currentLevelData);

  artistScreen.onAnswerSelected = (answerIndex) => {
    game.rememberAnswer(answerIndex);
    game.changeLevel();
  };

  renderScreen(artistScreen.element);
};

