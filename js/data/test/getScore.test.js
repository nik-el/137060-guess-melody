import getScore from '../getScore';
import {assert} from 'chai';

const createAnswer = (isCorrect, time) => ({isCorrect, time});

const getSpecialAnswer = (specialCase) => {
  switch (specialCase) {
    case `slow`: {
      return createAnswer(true, Math.random() + 30);
    }
    case `fast`: {
      return createAnswer(true, Math.random() + 10);
    }
    case `invalid`: {
      return createAnswer(false, Math.random() + 10);
    }
    default: {
      return createAnswer(Math.random() >= 0.5, Math.random() * 60);
    }
  }
};

const createAnswers = (quantity, specialCase) => {
  const answers = [];
  for (let i = 1; i <= quantity; i++) {
    answers.push(getSpecialAnswer(specialCase));
  }
  return answers;
};

suite(`getScore`, () => {

  test(`should return null when answers not array`, () => {
    const lives = 3;
    [
      42,
      {},
      null,
      ``
    ].forEach((item) =>{
      const actual = getScore(item, lives);
      assert.isNull(actual);
    });
  });

  test(`should return -1 when no available mistakes`, () => {
    const mistakes = -1;

    const actual = getScore(createAnswers(10, `fast`), mistakes);
    const expected = -1;

    assert.strictEqual(actual, expected);
  });

  test(`should return -1 when answers less 10`, () => {
    const lives = 2;

    const actual = getScore(createAnswers(9), lives);
    const expected = -1;

    assert.strictEqual(actual, expected);
  });

  test(`should return 10 when all answers are slow`, () => {
    const lives = 3;
    const actual = getScore(createAnswers(10, `slow`), lives);
    const expected = 10;

    assert.strictEqual(actual, expected);
  });

  test(`should return 20 when all answers are fast`, () => {
    const lives = 3;
    const actual = getScore(createAnswers(10, `fast`), lives);
    const expected = 20;

    assert.strictEqual(actual, expected);
  });

  test(`should return zero score when all answers are invalid`, () => {
    const lives = 3;
    const actual = getScore(createAnswers(10, `invalid`), lives);
    const expected = 0;

    assert.strictEqual(actual, expected);
  });

  test(`should return correct score`, () => {
    const lives = 1;

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

    let actual = getScore(answers, lives);
    let expected = 3;

    assert.strictEqual(actual, expected);

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

    actual = getScore(answers, lives);
    expected = 0;

    assert.strictEqual(actual, expected);

  });

});
