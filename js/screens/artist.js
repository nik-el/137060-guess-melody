import {getElementFromTemplate, renderScreen} from '../service/template';
import {renderGameScreen} from '../service/game';
import gameStateTemplate from '../template/state';
import gameArtistTemplate from '../template/artists';


export default (game) => {
  const currentLevelData = game.getCurrentLevelData();

  const screenContainer = getElementFromTemplate(`
    <section class="main main--level main--level-artist">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      </svg>
      <div>
        ${gameStateTemplate(game)}
      </div>  
      <div class="main-wrap">
        ${gameArtistTemplate(currentLevelData)}
      </div>   
    </section>
`);

  const renderedContainer = renderScreen(screenContainer);

  const answerClickHandler = (event) => {
    const checkedAnswer = currentLevelData.answers[event.target.value].isCorrect;

    game.getAnswer(checkedAnswer);
    game.changeLevel();
    renderGameScreen(game);
  };

  const artistsAnswer = renderedContainer.querySelectorAll(`.main-answer-wrapper`);
  artistsAnswer.forEach((answer) => {
    answer.addEventListener(`change`, answerClickHandler);
  });
};


