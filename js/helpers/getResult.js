const compareNumeric = (prev, next) => {
  return next - prev;
};
const GAME_OVER = {
  BY_TIME: `Время вышло! Вы не успели отгадать все мелодии`,
  BY_ATTEMPTS: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
};

export default (playerResult, resultsArray) => {
  if (typeof playerResult.lives !== `number`
    || typeof playerResult.score !== `number`
    || typeof playerResult.time !== `number`
    || !Array.isArray(resultsArray)) {
    return null;
  }

  for (const it of resultsArray) {
    if ((!it.lives || typeof it.lives !== `number`)
      || (!it.score || typeof it.score !== `number`)
      || (!it.time || typeof it.time !== `number`)) {
      return null;
    }
  }

  if (playerResult.lives === 0) {
    return GAME_OVER.BY_ATTEMPTS;
  }

  if (playerResult.time === 0) {
    return GAME_OVER.BY_TIME;
  }

  const commonScores = resultsArray.map((result) => {
    return result.score;
  });
  commonScores.push(playerResult.score);
  commonScores.sort(compareNumeric);

  const position = commonScores.indexOf(playerResult.score) + 1;
  const percentage = (((commonScores.length) - position) / (commonScores.length) * 100).toFixed(0);

  return `Вы заняли ${position} место из ${commonScores.length} игроков. Это лучше, чем у ${percentage}% игроков`;
};
