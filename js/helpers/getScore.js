const MIN_ANSWERS = 10;

export default (answers, lives) => {
  let result = 0;

  if (typeof lives !== `number` || !Array.isArray(answers)) {
    return null;
  }

  if (lives <= 0) {
    return -1;
  }

  if (answers.length < MIN_ANSWERS) {
    return -1;
  }

  for (const it of answers) {

    if (typeof it !== `object` && !it
      || typeof it.isCorrect !== `boolean`
      || typeof it.time !== `number`
      || it.time <= 0) {
      return null;
    }

    if (!it.isCorrect) {
      result = result - 2;
      continue;
    } else if (it.time > 0 && it.time < 30) {
      result = result + 2;
    } else if (it.time >= 30) {
      result++;
    }
  }

  if (result < 0) {
    result = -1;
  }

  return result;
};