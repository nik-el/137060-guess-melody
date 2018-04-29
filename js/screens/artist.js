import ArtistView from './views/artist-view';
import {game} from '../data/game-model';
import {renderScreen} from '../service/template';

export default (state, currentLevelData) => {
  const artistScreen = new ArtistView(state, currentLevelData);

  artistScreen.onAnswerSelected = (answerIndex) => {
    game.rememberAnswer(answerIndex);
    game.changeLevel();
  };

  renderScreen(artistScreen.element);
};

