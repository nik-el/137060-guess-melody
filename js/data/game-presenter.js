import HeaderView from '../screens/views/header-view';
import ArtistView from '../screens/views/artist-view';
import GenreView from '../screens/views/genre-view';
import {getRandomInt} from '../helpers';

class GamePresenter {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.game.element);
    this.root.appendChild(this.header.element);
    this._interval = null;
    this._interval = null;
  }

  get game() {
    const type = this.model.currentLevelData.type;
    let game;

    switch (type) {
      case `artist`:
        game = new ArtistView(this.model.state, this.model.currentLevelData);
        break;
      case `genre`:
        game = new GenreView(this.model.state, this.model.currentLevelData);
        break;
      default:
        throw new Error(`Wrong level type`);
    }
    return game;
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  get element() {
    return this.root;
  }

  stopTimer() {
    clearInterval(this._interval);
  }

  getGame() {
    const currentGame = this.game;
    currentGame.onAnswerSelected = () => {
      console.log('???');
    }
  }

  rememberAnswer(answersIndex) {
    let isCorrectAnswer;

    switch (this.model.currentLevelData.type) {
      case `artist`: {
        isCorrectAnswer = this.model.currentLevelData.answers[answersIndex].isCorrect;
        break;
      }
      case `genre`: {
        isCorrectAnswer = true;
        answersIndex.forEach((index) =>{
          if (!this.model.currentLevelData.answers[index].isCorrect) {
            isCorrectAnswer = false;
          }
        });
        break;
      }
    }

    if (!isCorrectAnswer) {
      ++this.model.state.mistakes;
    }

    this.userAnswers.push({
      isCorrect: isCorrectAnswer,
      time: getRandomInt(20, 40),
    });
  }

  isOver() {

  }

  startTimer() {
    this.getGame();

    this._interval = setInterval(() => {
      this.model.tick();
      this.updateHeader();
    }, 1000);
  }
}

export default GamePresenter;
