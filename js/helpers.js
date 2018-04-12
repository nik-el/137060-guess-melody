const getPercentage = (commonScores, position) => {
  const percentage = (((commonScores.length) - position) / (commonScores.length) * 100).toFixed(0);
  return percentage;
};

export {getPercentage};
