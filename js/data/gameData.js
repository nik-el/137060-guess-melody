import levels from './levels';
import {getRandomInt} from '../helpers';
import getScore from '../service/getScore';
import renderWelcomeScreen from '../screens/welcome';
import renderArtistScreen from '../screens/artist';
import renderGenreScreen from '../screens/genre';
import renderResultScreen from '../screens/result';

const AVAILABLE_MISTAKES = 3;

let game;

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
    renderWelcomeScreen();
  }

  renderGameScreen() {
    const levelData = game.getCurrentLevelData();

    if (levelData.type === `result`) {
      this.state.score = getScore(this.currentAnswers, this.state.mistakes);
      renderResultScreen(this.state);
    } else if (levelData.type === `artist`) {
      renderArtistScreen(this.state, this.currentLevel);
    } else if (levelData.type === `genre`) {
      renderGenreScreen(this.state, this.currentLevel);
    }
  }
}

const resultsArray =
  [
    {mistakes: 2, score: 5, time: 30},
    {mistakes: 2, score: 10, time: 30},
    {mistakes: 2, score: 15, time: 30}
  ];

const initGame = () => {
  game = new Game();
  game.resetGame();
};


export {initGame, game, resultsArray, AVAILABLE_MISTAKES};
