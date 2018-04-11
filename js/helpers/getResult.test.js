import getResult from './getResult';
import {assert} from 'chai';

const playerResult = {
  lives: 2,
  score: 6,
  time: 30,
};

describe(`getResult`, () => {

  it(`should return timeout message`, () => {
    const timeOutPlayer = {
      lives: 2,
      score: 6,
      time: 0,
    };
    let resultsArray = [{lives: 2, score: 1, time: 30}];
    assert.equal(getResult(timeOutPlayer, resultsArray), `Время вышло! Вы не успели отгадать все мелодии`);
  });

  it(`should return no lives message`, () => {
    const noLivesPlayer = {
      lives: 0,
      score: 6,
      time: 20,
    };
    let resultsArray = [{lives: 2, score: 1, time: 30}];
    assert.equal(getResult(noLivesPlayer, resultsArray), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });

  it(`should return win message`, () => {
    let resultsArray =
      [
        {lives: 2, score: 1, time: 30},
        {lives: 2, score: 2, time: 30},
        {lives: 2, score: 3, time: 30},
        {lives: 2, score: 4, time: 30},
        {lives: 2, score: 5, time: 30}
      ];
    assert.equal(getResult(playerResult, resultsArray), `Вы заняли 1 место из 6 игроков. Это лучше, чем у 83% игроков`);

    resultsArray =
      [
        {lives: 2, score: 2, time: 30},
        {lives: 2, score: 8, time: 30},
      ];
    assert.equal(getResult(playerResult, resultsArray), `Вы заняли 2 место из 3 игроков. Это лучше, чем у 33% игроков`);

    resultsArray =
      [
        {lives: 2, score: 10, time: 30},
        {lives: 2, score: 20, time: 30},
        {lives: 2, score: 11, time: 30}
      ];
    assert.equal(getResult(playerResult, resultsArray), `Вы заняли 4 место из 4 игроков. Это лучше, чем у 0% игроков`);
  });

});

