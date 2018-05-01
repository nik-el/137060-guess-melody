import {getPercentage, getCorrectPlayersText} from '../helpers';

const AVAILABLE_MISTAKES = 3;

const GAME_OVER = {
  BY_TIME: `Время вышло! Вы не успели отгадать все мелодии`,
  BY_ATTEMPTS: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
};

const compareNumeric = (prev, next) => {
  return next - prev;
};

export default (playerResult, resultsArray) => {
  if (!Array.isArray(resultsArray)) {
    return null;
  }

  if (playerResult.mistakes >= AVAILABLE_MISTAKES) {
    return GAME_OVER.BY_ATTEMPTS;
  }

  if (playerResult.time === 0) {
    return GAME_OVER.BY_TIME;
  }

  const commonScores = resultsArray.map((result) => {
    if (!result) {
      return null;
    }
    return result.score;
  });
  commonScores.push(playerResult.score);
  commonScores.sort(compareNumeric);

  const position = commonScores.indexOf(playerResult.score) + 1;
  const percentage = getPercentage(commonScores, position);

  return `Вы заняли ${position} место из ${getCorrectPlayersText(commonScores.length)}. Это лучше, чем у ${percentage}% игроков`;
};
