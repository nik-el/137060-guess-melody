import GenreView from './views/genre';
import {game} from '../data/gameData';
import {renderScreen} from "../service/template";

export default (state, level) => {
  const levelData = game.getCurrentLevelData(level);
  const genreScreen = new GenreView(game.state, levelData);

  genreScreen.sendAnswerClickHandler = () => {
    const checkedAnswers = genreScreen.element.querySelectorAll(`input[name=answer]:checked`);

    let commonAnswer = true;
    for (const it of checkedAnswers) {
      if (!levelData.answers[it.value].isCorrect) {
        commonAnswer = false;
      }
    }

    game.getAnswer(commonAnswer);
    game.changeLevel();
    game.renderGameScreen();

  };

  renderScreen(genreScreen.element);
  return genreScreen.element;
};
