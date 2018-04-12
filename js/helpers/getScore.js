const MIN_ANSWERS = 10;
const FAST_TIME = 30;

export default (answers, lives) => {
  if (typeof lives !== `number` || !Array.isArray(answers)) {
    return null;
  }

  if (lives <= 0 || answers.length < MIN_ANSWERS) {
    return -1;
  }

  let result = 0;
  result = answers
      .filter((answer) => answer.time > 0)
      .reduce((acc, answer) => {
        if (!answer.isCorrect) {
          return acc - 2;
        }

        if (answer.time < FAST_TIME) {
          return acc + 2;
        } else if (answer.time >= FAST_TIME) {
          return acc + 1;
        }

        return acc;
      }, 0);

  if (result < 0) {
    result = -1;
  }

  return result;
};
