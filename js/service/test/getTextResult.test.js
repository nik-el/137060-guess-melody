import getResult from '../getTextResult';
import {assert} from 'chai';

suite(`getResult`, () => {

  test(`should return timeout message`, () => {
    const timeOutPlayer = {mistakes: 2, score: 6, time: 0};
    const resultsArray = [{mistakes: 2, score: 1, time: 30}];

    const actual = getResult(timeOutPlayer, resultsArray);
    const expected = `Время вышло! Вы не успели отгадать все мелодии`;

    assert.equal(actual, expected);
  });

  test(`should return no available mistakes`, () => {
    const nomistakesPlayer = {mistakes: 4, score: 6, time: 20};
    let resultsArray = [{livmistakeses: 2, score: 1, time: 30}];

    const actual = getResult(nomistakesPlayer, resultsArray);
    const expected = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;

    assert.equal(actual, expected);
  });

  test(`should return win message for first place`, () => {
    const playerResult = {mistakes: 2, score: 6, time: 30};
    let resultsArray =
      [
        {mistakes: 2, score: 1, time: 30},
        {mistakes: 2, score: 2, time: 30},
        {mistakes: 2, score: 3, time: 30},
        {mistakes: 2, score: 4, time: 30},
        {mistakes: 2, score: 5, time: 30}
      ];

    let actual = getResult(playerResult, resultsArray);
    let expected = `Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`;

    assert.equal(actual, expected);
  });

  test(`should return win message for second place`, () => {
    const playerResult = {mistakes: 2, score: 6, time: 30};
    const resultsArray =
      [
        {mistakes: 2, score: 2, time: 30},
        {mistakes: 2, score: 8, time: 30},
      ];

    const actual = getResult(playerResult, resultsArray);
    const expected = `Вы заняли 2 место из 3 игроков. Это лучше, чем у 33% игроков`;

    assert.equal(actual, expected);
  });

  test(`should return win message for last place`, () => {
    const playerResult = {mistakes: 2, score: 6, time: 30};
    const resultsArray =
      [
        {mistakes: 2, score: 10, time: 30},
        {mistakes: 2, score: 20, time: 30},
        {mistakes: 2, score: 11, time: 30}
      ];

    const actual = getResult(playerResult, resultsArray);
    const expected = `Вы заняли 4 место из 4 игроков. Это лучше, чем у 0% игроков`;

    assert.equal(actual, expected);
  });

});

