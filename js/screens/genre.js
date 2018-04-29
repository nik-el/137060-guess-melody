import GenreView from './views/genre-view';
import {game} from '../data/game-model';
import {renderScreen} from '../service/template';

export default (state, currentLevelData) => {
  const genreScreen = new GenreView(state, currentLevelData);

  genreScreen.sendAnswerClickHandler = () => {
    const checkedAnswersValue =
      Array
          .from(genreScreen.element.querySelectorAll(`input[name=answer]:checked`))
          .map(({value}) => value);

    game.rememberAnswer(checkedAnswersValue);
    game.changeLevel();
  };

  renderScreen(genreScreen.element);
};
