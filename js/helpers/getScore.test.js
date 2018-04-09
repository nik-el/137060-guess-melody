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
    } else {
      const booleanValue = Math.random() >= 0.5;
      const timeValue = (Math.random() * 60);
      answers.push({isCorrect: booleanValue, time: timeValue});
    }
  }
  return answers;
};

describe(`getScore`, () => {

  it(`should return null when answers not array`, () => {
    [
      42,
      {},
      null,
      ``
    ].forEach((item) => assert.isNull(getScore(item)));
  });

  it(`should return -1 when few answers`, () => {
    const FEW_ANSWERS = -1;
    [
      [],
      [null],
      [0, 42],
      []
    ].forEach((item) => assert.strictEqual(getScore(item), FEW_ANSWERS));
    assert.strictEqual(getScore(createAnswers(5)), FEW_ANSWERS);
    assert.strictEqual(getScore(createAnswers(9)), FEW_ANSWERS);
  });

  it(`should return null when answer not consistent`, () => {
    let answers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    assert.isNull(getScore(answers));

    answers = createAnswers(10);
    answers[2].isCorrect = 34;
    assert.isNull(getScore(answers));

    answers = createAnswers(10);
    answers[3].time = `time`;
    assert.isNull(getScore(answers));
  });

  it(`should return correct score`, () => {
    assert.strictEqual(getScore(createAnswers(10, `slow`)), 10);
    assert.strictEqual(getScore(createAnswers(10, `fast`)), 20);

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
    assert.strictEqual(getScore(answers), 3);

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
    assert.strictEqual(getScore(answers), -1);

  });
});
