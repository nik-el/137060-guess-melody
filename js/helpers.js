const getPercentage = (commonScores, position) => {
  const percentage = (((commonScores.length) - position) / (commonScores.length) * 100).toFixed(0);
  return percentage;
};

const getCorrectNoun = (quantity, one, betweenTwoAndFour, fiveAndMore) => {
  quantity %= 100;
  if (quantity >= 5 && quantity <= 20) {
    return fiveAndMore;
  }

  quantity %= 10;
  if (quantity === 1) {
    return one;
  }
  if (quantity >= 2 && quantity <= 4) {
    return betweenTwoAndFour;
  }

  return fiveAndMore;
};

export {getPercentage, getCorrectNoun};
