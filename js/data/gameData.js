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
    this.userAnswers = [];
  }

  changeLevel() {
    if (this.state.mistakes > AVAILABLE_MISTAKES) {
      this.currentLevel = `result`;
    } else {
      this.currentLevel = this.levels[this.currentLevel].next;
    }

    this.renderGameScreen();
  }

  get currentLevelData() {
    return this.levels[this.currentLevel];
  }

  rememberAnswer(answersIndex) {
    let isCorrectAnswer;

    switch (this.currentLevelData.type) {
      case `artist`: {
        isCorrectAnswer = this.currentLevelData.answers[answersIndex].isCorrect;
        break;
      }
      case `genre`: {
        isCorrectAnswer = true;
        answersIndex.forEach((index) =>{
          if (!this.currentLevelData.answers[index].isCorrect) {
            isCorrectAnswer = false;
          }
        });
        break;
      }
    }

    if (!isCorrectAnswer) {
      ++this.state.mistakes;
    }

    this.userAnswers.push({
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
    this.userAnswers = [];
    renderWelcomeScreen();
  }

  renderGameScreen() {
    switch (this.currentLevelData.type) {
      case `result`: {
        this.state.score = getScore(this.userAnswers, this.state.mistakes);
        renderResultScreen(this.state, this.userAnswers);
        break;
      }
      case `artist`: {
        renderArtistScreen(this.state, this.currentLevelData);
        break;
      }
      case `genre`: {
        renderGenreScreen(this.state, this.currentLevelData);
        break;
      }
    }
  }
}

const initGame = () => {
  game = new Game();
  renderWelcomeScreen();
};

export {initGame, game, AVAILABLE_MISTAKES};
