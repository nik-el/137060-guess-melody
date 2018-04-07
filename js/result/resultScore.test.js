import {countScores} from "./resultScore";
import {assert} from 'chai';


describe(`Check calculation result`, () => {

  it(`should be array`, () => {
    assert.throw(() => countScores(32), /Answers should be array/);
    assert.throw(() => countScores({}), /Answers should be array/);
    assert.throw(() => countScores(null), /Answers should be array/);
    assert.throw(() => countScores(``), /Answers should be array/);
  });

  it(`should be correct answer`, () => {
    let answers = [];
    assert.throw(() => countScores(answers), /Answer should be object/);

    answers = [null];
    assert.throw(() => countScores(answers), /Answer should be object/);

    answers = [1, 213, 12312, 123, 213];
    assert.throw(() => countScores(answers), /Answer should be object/);
  });

  it(`should be correct value in answer`, () => {
    let answers = [{}];
    assert.throw(() => countScores(answers), /Answer should include correct value/);

    answers = [{correct: true}];
    assert.throw(() => countScores(answers), /Answer should include correct value/);

    answers = [{time: 44}];
    assert.throw(() => countScores(answers), /Answer should include correct value/);

    answers = [{correct: 1, time: 33}];
    assert.throw(() => countScores(answers), /Answer should include correct value/);

    answers = [{correct: false, time: true}];
    assert.throw(() => countScores(answers), /Answer should include correct value/);
  });

  it(`should not allow set negative or zero time`, () => {
    let answers = [{correct: true, time: 0}];
    assert.throw(() => countScores(answers), /Time should be positive number/);

    answers = [{correct: false, time: -1}];
    assert.throw(() => countScores(answers), /Time should be positive number/);
  });


  it(`should calculate result from answers`, () => {
    let answers = [
      {correct: true, time: 10},
      {correct: true, time: 10},
      {correct: true, time: 10},
    ];
    assert.equal(countScores(answers), 6);

    answers = [
      {correct: true, time: 40},
      {correct: true, time: 40},
      {correct: true, time: 40},
    ];
    assert.equal(countScores(answers), 3);

    answers = [
      {correct: false, time: 10},
      {correct: false, time: 20},
      {correct: false, time: 40},
    ];
    assert.equal(countScores(answers), 0);

    answers = [
      {correct: true, time: 10},
      {correct: true, time: 40},
      {correct: false, time: 30},
    ];
    assert.equal(countScores(answers), 3);
  });
});
