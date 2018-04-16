const getPercentage = (commonScores, position) => {
  const percentage = (((commonScores.length) - position) / (commonScores.length) * 100).toFixed(0);
  return percentage;
};

const getFastAnswers = (answers) => {
  let result = 0;
  answers.forEach((answer) => {
    if (answer.time < 30) {
      result++;
    }
  });
  return result;
};

const getCorrectNoun = (quantity, one, betweenTwoAndFour, fiveAndMore) => {
  quantity %= 100;
  if (quantity >= 5 && quantity <= 20) {
    return `${quantity} ${fiveAndMore}`;
  }

  quantity %= 10;
  if (quantity === 1) {
    return `${quantity} ${one}`;
  }
  if (quantity >= 2 && quantity <= 4) {
    return `${quantity} ${betweenTwoAndFour}`;
  }

  return `${quantity} ${fiveAndMore}`;
};

const getTimerFormat = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  const timer = {minutes, seconds};
  return timer;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export {getPercentage, getCorrectNoun, getTimerFormat, getRandomInt, getFastAnswers};
