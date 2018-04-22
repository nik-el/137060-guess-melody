import levels from './levels';
import {getRandomInt} from '../helpers';

const AVAILABLE_MISTAKES = 3;

class Game {
  constructor() {
    this.levels = levels;
    this.currentLevel = `artist-1`;
    this.state = {
      mistakes: 0,
      time: 300,
      score: 0,
    };
    this.currentAnswers = [];
  }

  changeLevel() {
    if (this.state.mistakes > AVAILABLE_MISTAKES) {
      this.currentLevel = `result`;
    } else {
      this.currentLevel = this.levels[this.currentLevel].next;
    }
    return this.currentLevel;
  }

  getCurrentLevelData() {
    return this.levels[this.currentLevel];
  }

  getAnswer(isCorrectAnswer) {
    if (!isCorrectAnswer) {
      ++this.state.mistakes;
    }
    this.currentAnswers.push({
      isCorrect: isCorrectAnswer,
      time: getRandomInt(20, 40),
    });
  }

  resetGame() {
    this.state = {
      mistakes: 0,
      time: 300,
      score: 0,
    };
    this.currentLevel = `artist-1`;
    this.currentAnswers = [];
  }
}

const resultsArray =
  [
    {mistakes: 2, score: 5, time: 30},
    {mistakes: 2, score: 10, time: 30},
    {mistakes: 2, score: 15, time: 30}
  ];

export {Game, resultsArray, AVAILABLE_MISTAKES};
