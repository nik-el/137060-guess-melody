import {resultsArray, AVAILABLE_MISTAKES} from '../data/gameData';
import getTextResult from '../service/getTextResult';
import {
  getTimerFormat,
  getFastAnswers,
  getCorrectMinutesText,
  getCorrectSecondsText,
  getCorrectScoreText,
  getCorrectFastAnswerText,
  getCorrectMistakesText,
} from '../helpers';

export default (game) => {
  const currentResult = game.state;

  let textResult = ``;
  if (currentResult.mistakes > AVAILABLE_MISTAKES) {
    textResult =
      `<h2 class="title">Какая жалость!</h2>
      <div class="main-stat">${getTextResult(currentResult, resultsArray)}</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>    
    `;
    return textResult;
  } else if (!currentResult.time) {
    textResult = `
      <h2 class="title">Увы и ах!</h2>
      <div class="main-stat">${getTextResult(currentResult, resultsArray)}/div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>    
    `;
    return textResult;
  } else {
    const currentTime = getTimerFormat(currentResult.time);

    const textMinutes = getCorrectMinutesText(currentTime.minutes);
    const textSeconds = getCorrectSecondsText(currentTime.seconds);
    const textScore = getCorrectScoreText(currentResult.score);
    const textFastAnswer = getCorrectFastAnswerText(getFastAnswers(game.currentAnswers));
    const textMistakes = getCorrectMistakesText(currentResult.mistakes);

    textResult = `<h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">
      За ${textMinutes}
      и  ${textSeconds}
        <br>вы&nbsp;набрали ${textScore}
        (${textFastAnswer})
        <br>совершив ${textMistakes}</div>
      <span class="main-comparison">${getTextResult(currentResult, resultsArray)}</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    `;
    return textResult;

  }
};
