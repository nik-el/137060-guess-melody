import GenreView from './views/genre';
import {game} from '../data/gameData';
import {renderScreen} from "../service/template";

export default (state, currentLevelData) => {
  const genreScreen = new GenreView(state, currentLevelData);

  genreScreen.sendAnswerClickHandler = () => {
    const checkedAnswersValue =
      Array.from(genreScreen.element.querySelectorAll(`input[name=answer]:checked`))
          .map((answer)=> {
            return answer.value;
          });

    game.rememberAnswer(checkedAnswersValue);
    game.changeLevel();
  };

  renderScreen(genreScreen.element);
};
