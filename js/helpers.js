import {GameRules} from './game/game-data';

const getPercentage = (commonScores, position) => {
  return (((commonScores.length) - position) / (commonScores.length) * 100).toFixed(0);
};

const getFastAnswers = (answers) => {
  const fastAnswers = answers.filter((answer) => {
    return (answer.time < GameRules.FAST_TIME && answer.isCorrect);
  });

  return fastAnswers.length;
};

const getCorrectNoun = ([one, betweenTwoAndFour, fiveAndMore]) => (originQuantity) => {
  let quantity = originQuantity;

  quantity %= 100;
  if (quantity >= 5 && quantity <= 20) {
    return `${originQuantity} ${fiveAndMore}`;
  }

  quantity %= 10;
  if (quantity === 1) {
    return `${originQuantity} ${one}`;
  }
  if (quantity >= 2 && quantity <= 4) {
    return `${originQuantity} ${betweenTwoAndFour}`;
  }

  return `${originQuantity} ${fiveAndMore}`;
};

const getCorrectMinutesText = getCorrectNoun([`минуту`, `минуты`, `минут`]);
const getCorrectSecondsText = getCorrectNoun([`секунду`, `секунды`, `секунд`]);
const getCorrectScoreText = getCorrectNoun([`балл`, `балла`, `баллов`]);
const getCorrectFastAnswerText = getCorrectNoun([`быстрый`, `быстрых`, `быстрых`]);
const getCorrectMistakesText = getCorrectNoun([`ошибку`, `ошибки`, `ошибок`]);
const getCorrectPlayersText = getCorrectNoun([`игрока`, `игроков`, `игроков`]);
const getCorrectMistakesTimeText = getCorrectNoun([`раз`, `раза`, `раз`]);


const getTimerFormat = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return {minutes, seconds};
};

export {
  getPercentage,
  getCorrectNoun,
  getTimerFormat,
  getFastAnswers,
  getCorrectMinutesText,
  getCorrectSecondsText,
  getCorrectScoreText,
  getCorrectFastAnswerText,
  getCorrectMistakesText,
  getCorrectPlayersText,
  getCorrectMistakesTimeText
};
