import AbstractView from '../abstract-view';
import {getElementFromTemplate, renderScreen} from '../service/template';
import {renderGameScreen} from '../service/game';
import gameStateTemplate from '../template/state';
import gameGenreTemplate from '../template/genre';

export default class GenreScreenView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    return (`
      <section class="main main--level main--level-genre">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      </svg>
      <div>
        ${gameStateTemplate(this.game)}
      </div>
      <div class="main-wrap">
        ${gameGenreTemplate(this.game.getCurrentLevelData())}
      </div>
    </section>
    `);
  }

  _chooseAnswerClickHandler(sendAnswer, genresAnswer) {
    sendAnswer.disabled = true;
    for (const answer of genresAnswer) {
      if (answer.checked) {
        sendAnswer.disabled = false;
      }
    }
  }

  sendAnswerClickHandler() {
  }

  bind(element) {
    const genreForm = element.querySelector(`.genre`);
    const genresAnswer = element.querySelectorAll(`.genre-answer input`);
    const sendAnswer = element.querySelector(`.genre-answer-send`);

    genresAnswer.forEach((answer) => {
      answer.addEventListener(`click`, this._chooseAnswerClickHandler(sendAnswer, genresAnswer));
    });

    sendAnswer.addEventListener(`click`, this.sendAnswerClickHandler);
  }
}
//
// export default (game) => {
//   const currentLevelData = game.getCurrentLevelData();
//
//   const screenContainer = getElementFromTemplate(`
//   <section class="main main--level main--level-genre">
//     <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
//       <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
//     </svg>
//     <div>
//       ${gameStateTemplate(game)}
//     </div>
//     <div class="main-wrap">
//       <form class="genre">
//
//       </form>
//       ${gameGenreTemplate(currentLevelData)}
//     </div>
//   </section>
// `);
//   const renderedContainer = renderScreen(screenContainer);
//
//   const genreForm = renderedContainer.querySelector(`.genre`);
//   const genresAnswer = renderedContainer.querySelectorAll(`.genre-answer input`);
//   const sendAnswer = renderedContainer.querySelector(`.genre-answer-send`);
//
//   const resetForm = () => {
//     sendAnswer.disabled = true;
//     genreForm.reset();
//   };
//   resetForm();
//
//   const chooseAnswerClickHandler = () => {
//     sendAnswer.disabled = true;
//     for (const answer of genresAnswer) {
//       if (answer.checked) {
//         sendAnswer.disabled = false;
//       }
//     }
//   };
//
//   const sendAnswerClickHandler = () => {
//     const checkedAnswers = genreForm.querySelectorAll(`input[name=answer]:checked`);
//
//     let commonAnswer = true;
//     for (const it of checkedAnswers) {
//       if (!currentLevelData.answers[it.value].isCorrect) {
//         commonAnswer = false;
//       }
//     }
//
//     game.getAnswer(commonAnswer);
//     game.changeLevel();
//     renderGameScreen(game);
//   };
//
//   genresAnswer.forEach((answer) => {
//     answer.addEventListener(`click`, chooseAnswerClickHandler);
//   });
//
//   sendAnswer.addEventListener(`click`, sendAnswerClickHandler);
// };
