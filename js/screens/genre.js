import {getElementFromTemplate, renderScreen} from '../service/commonService';
import {pushNextLevel, checkAnswer} from '../service/gameService';
import gameStateTemplate from '../service/stateService';
import gameGenreTemplate from '../service/genreService';
import {currentResult, GAME_BY_GENRE} from '../data/gameData';

export default (level) => {
  const currentLevel = GAME_BY_GENRE[level];

  const screenContainer = getElementFromTemplate(`
  <section class="main main--level main--level-genre">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    </svg>
    <div>
      ${gameStateTemplate(currentResult)}
    </div>
    <div class="main-wrap">
      ${gameGenreTemplate(currentLevel)}
    </div>
  </section>
`);
  const renderedContainer = renderScreen(screenContainer);

  const genreForm = renderedContainer.querySelector(`.genre`);
  const genresAnswer = renderedContainer.querySelectorAll(`.genre-answer input`);
  const sendAnswer = renderedContainer.querySelector(`.genre-answer-send`);

  const resetForm = () => {
    sendAnswer.disabled = true;
    genreForm.reset();
  };
  resetForm();

  const chooseAnswerClickHandler = () => {
    sendAnswer.disabled = true;
    for (const answer of genresAnswer) {
      if (answer.checked) {
        sendAnswer.disabled = false;
      }
    }
  };

  const sendAnswerClickHandler = () => {
    const checkedAnswers = genreForm.querySelectorAll(`input[name=answer]:checked`);

    let commonAnswer = true;
    for (const it of checkedAnswers) {
      if (!currentLevel.answers[it.value].isCorrect) {
        commonAnswer = false;
      }
    }

    checkAnswer(commonAnswer);
    pushNextLevel(currentLevel.next);
  };

  genresAnswer.forEach((answer) => {
    answer.addEventListener(`click`, chooseAnswerClickHandler);
  });

  sendAnswer.addEventListener(`click`, sendAnswerClickHandler);
};
