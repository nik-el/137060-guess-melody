import {GAME_RULE} from '../game/game-data';

export default (answers, mistakes) => {
  if (typeof mistakes !== `number` || !Array.isArray(answers)) {
    return null;
  }

  if (mistakes >= GAME_RULE.AVAILABLE_MISTAKES || answers.length < GAME_RULE.MIN_ANSWERS) {
    return -1;
  }
  let result = answers
      .filter((answer) => answer.time >= 0)
      .reduce((acc, answer) => {
        if (!answer.isCorrect) {
          return acc - 2;
        }

        if (answer.time < GAME_RULE.FAST_TIME) {
          return acc + 2;
        } else if (answer.time >= GAME_RULE.FAST_TIME) {
          return acc + 1;
        }

        return acc;
      }, 0);

  if (result < 0) {
    result = 0;
  }

  return result;
};
