import {getElementFromTemplate, renderScreen} from '../service/commonService';
import {pushNextLevel, checkAnswer} from '../service/gameService';
import gameStateTemplate from '../service/stateService';
import gameArtistTemplate from '../service/artistsService';
import {GAME_BY_ARTISTS, currentResult} from '../data/gameData';


export default (level) => {
  const currentLevel = GAME_BY_ARTISTS[level];

  const screenContainer = getElementFromTemplate(`
    <section class="main main--level main--level-artist">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      </svg>
      <div>
        ${gameStateTemplate(currentResult)}
      </div>  
      <div class="main-wrap">
        ${gameArtistTemplate(currentLevel)}
      </div>   
    </section>
`);

  const renderedContainer = renderScreen(screenContainer);

  const answerClickHandler = (event) => {

    checkAnswer(currentLevel.answers[event.target.value].isCorrect);
    pushNextLevel(currentLevel.next);
  };

  const artistsAnswer = renderedContainer.querySelectorAll(`.main-answer-wrapper`);
  artistsAnswer.forEach((answer) => {
    answer.addEventListener(`change`, answerClickHandler);
  });
};


