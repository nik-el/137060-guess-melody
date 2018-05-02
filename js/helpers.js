import {GAME_RULE} from './game/game-data';

const getPercentage = (commonScores, position) => {
  return (((commonScores.length) - position) / (commonScores.length) * 100).toFixed(0);
};

const getFastAnswers = (answers) => {
  let result = 0;
  answers.forEach((answer) => {
    if (answer.time < GAME_RULE.FAST_TIME && answer.isCorrect) {
      result++;
    }
  });
  return result;
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


const getTimerFormat = (time) => {
  let minutes = Math.floor(time / 60);

  let seconds = time - minutes * 60;
  if (seconds < 10) {
    seconds = `0` + seconds;
  }

  return {minutes, seconds};
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export {
  getPercentage,
  getCorrectNoun,
  getTimerFormat,
  getRandomInt,
  getFastAnswers,
  getCorrectMinutesText,
  getCorrectSecondsText,
  getCorrectScoreText,
  getCorrectFastAnswerText,
  getCorrectMistakesText,
  getCorrectPlayersText
};
