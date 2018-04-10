import getScore from './getScore';
import {assert} from 'chai';

const createAnswers = (quantity, specialCase) =>{
  const answers = [];
  for (let i = 1; i <= quantity; i++) {
    if (specialCase && specialCase === `slow`) {
      const booleanValue = true;
      const timeValue = Math.random() + 30;
      answers.push({isCorrect: booleanValue, time: timeValue});
    } else if (specialCase && specialCase === `fast`) {
      const booleanValue = true;
      const timeValue = Math.random() + 10;
      answers.push({isCorrect: booleanValue, time: timeValue});
    } else if (specialCase && specialCase === `no correct`) {
      const booleanValue = false;
      const timeValue = Math.random() + 30;
      answers.push({isCorrect: booleanValue, time: timeValue});
    } else {
      const booleanValue = Math.random() >= 0.5;
      const timeValue = (Math.random() * 60);
      answers.push({isCorrect: booleanValue, time: timeValue});
    }
  }
  return answers;
};

const GAME_OVER = -1;

describe(`getScore`, () => {

  it(`should return null when answers not array`, () => {
    [
      42,
      {},
      null,
      ``
    ].forEach((item) => assert.isNull(getScore(item, 3)));
  });

  it(`should return null when answer not consistent`, () => {
    let answers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    assert.isNull(getScore(answers, 3));

    answers = createAnswers(10);
    answers[2].isCorrect = 34;
    assert.isNull(getScore(answers, 3));

    answers = createAnswers(10);
    answers[3].time = `time`;
    assert.isNull(getScore(answers, 2));
  });

  it(`should return -1 when zero lives`, () => {
    assert.strictEqual(getScore(createAnswers(10, `fast`), 0), GAME_OVER);
    assert.strictEqual(getScore(createAnswers(10, `slow`), 0), GAME_OVER);
  });

  it(`should return -1 when answers less 10`, () => {
    [
      [],
      [null],
      [0, 42],
      []
    ].forEach((item) => assert.strictEqual(getScore(item, 3), GAME_OVER));
    assert.strictEqual(getScore(createAnswers(5), 2), GAME_OVER);
    assert.strictEqual(getScore(createAnswers(9), 3), GAME_OVER);
  });

  it(`should return correct score`, () => {

    assert.strictEqual(getScore(createAnswers(10, `slow`), 2), 10);
    assert.strictEqual(getScore(createAnswers(10, `fast`), 2), 20);
    assert.strictEqual(getScore(createAnswers(10, `no correct`), 1), GAME_OVER);

    let answers = [
      {isCorrect: false, time: 23},
      {isCorrect: false, time: 11},
      {isCorrect: false, time: 2},
      {isCorrect: true, time: 11},
      {isCorrect: true, time: 11},
      {isCorrect: true, time: 34},
      {isCorrect: true, time: 55},
      {isCorrect: true, time: 66},
      {isCorrect: true, time: 99},
      {isCorrect: true, time: 100},
    ];
    assert.strictEqual(getScore(answers, 3), 3);

    answers = [
      {isCorrect: false, time: 23},
      {isCorrect: false, time: 11},
      {isCorrect: false, time: 2},
      {isCorrect: false, time: 11},
      {isCorrect: false, time: 11},
      {isCorrect: false, time: 34},
      {isCorrect: false, time: 55},
      {isCorrect: true, time: 66},
      {isCorrect: true, time: 99},
      {isCorrect: true, time: 100},
    ];
    assert.strictEqual(getScore(answers, 3), GAME_OVER);

  });
});
