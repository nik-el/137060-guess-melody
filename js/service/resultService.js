import {currentResult, resultsArray, currentAnswers} from '../data/gameData';
import {getTimerFormat, getCorrectNoun, getFastAnswers} from '../helpers';
import getTextResult from './getTextResult';

export default () => {
  let textResult = ``;
  if (currentResult.mistakes < 0) {
    textResult = `<h2 class="title">Какая жалость!</h2>
      <div class="main-stat">${getTextResult(currentResult, resultsArray)}</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>    
    `;
  } else if (!currentResult.time) {
    textResult = `<h2 class="title">Увы и ах!</h2>
      <div class="main-stat">${getTextResult(currentResult, resultsArray)}/div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>    
    `;
  } else {
    const currentTime = getTimerFormat(currentResult.time);
    textResult = `
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">
      За ${getCorrectNoun(currentTime.minutes, `минуту`, `минуты`, `минут`)}
      и  ${getCorrectNoun(currentTime.seconds, `секунду`, `секунды`, `секунд`)}
        <br>вы&nbsp;набрали ${getCorrectNoun(currentResult.score, `балл`, `балла`, `баллов`)}
        (${getCorrectNoun(getFastAnswers(currentAnswers), `быстрый`, `быстрых`, `быстрых`)})
        <br>совершив ${getCorrectNoun(3 - currentResult.mistakes, `ошибку`, `ошибки`, `ошибок`)}</div>
      <span class="main-comparison">${getTextResult(currentResult, resultsArray)}</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    `;
  }
  return textResult;
};
