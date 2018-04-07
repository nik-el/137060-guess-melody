export const countScores = (answers) => {
  let result = 0;

  if (!Array.isArray(answers)) {
    throw new Error(`Answers should be array`);
  }

  if (!answers.length) {
    throw new Error(`Answer should be object`);
  }

  answers.forEach((answer) => {
    if (Object.prototype.toString.call(answer) !== `[object Object]`) {
      throw new Error(`Answer should be object`);
    }

    if (Object.prototype.toString.call(answer.correct) !== `[object Boolean]` || Object.prototype.toString.call(answer.time) !== `[object Number]`) {
      throw new Error(`Answer should include correct value`);
    }

    if (answer.time <= 0) {
      throw new Error(`Time should be positive number`);
    }

    // calculation
    if (!answer.correct) {
      return;
    } else if (answer.time > 0 && answer.time < 30) {
      result = result + 2;
    } else if (answer.time >= 30) {
      result++;
    }
  });

  return result;
};
