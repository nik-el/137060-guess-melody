import {GameRules} from '../game/game-data';

export default (answers, mistakes) => {
  if (mistakes > GameRules.AVAILABLE_MISTAKES || answers.length < GameRules.MIN_ANSWERS) {
    return -1;
  }
  let result = answers
      .filter((answer) => answer.time >= 0)
      .reduce((acc, answer) => {
        if (!answer.isCorrect) {
          return acc - 2;
        }

        if (answer.time < GameRules.FAST_TIME) {
          return acc + 2;
        }

        return acc + 1;
      }, 0);

  if (result < 0) {
    result = 0;
  }

  return result;
};
