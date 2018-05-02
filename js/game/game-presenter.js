import HeaderView from '../views/header-view';
import ArtistView from '../views/artist-view';
import GenreView from '../views/genre-view';

class GamePresenter {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);

    this.currentGame = this.game;
    this.levelTime = null;

    this._interval = null;
    this._levelInterval = null;

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.currentGame.element);
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
    }
    return game;
  }

  initGame() {
    this.startGameTimer();
    this.nextGame();
  }

  startGameTimer() {
    this._interval = setInterval(() => {
      if (this.model.state.time <= 0) {
        this.stopGame();
      }
      this.model.tick();
      this.updateHeader();
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this._interval);
  }

  startLevelTimer() {
    this.levelTime = 0;
    this._levelInterval = setInterval(() => {
      this.levelTime++;
    }, 1000);
  }

  stopLevelTimer() {
    clearInterval(this._levelInterval);
    this.levelTime = null;
  }

  stopGame() {
    this.stopGameTimer();
    this.stopLevelTimer();
    this.isOver(this.model.state, this.model.userAnswers);
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  nextGame() {
    this.updateHeader();
    this.startLevelTimer();

    const game = this.game;
    game.sendAnswerClickHandler = this.rememberAnswer.bind(this);
    this.updateGame(game);
  }

  get element() {
    return this.root;
  }

  updateGame(view) {
    this.root.replaceChild(view.element, this.currentGame.element);
    this.currentGame = view;
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

    this.model.userAnswers.push({
      isCorrect: isCorrectAnswer,
      time: this.levelTime,
    });

    this.model.changeLevel();

    if (this.model.state.level !== `result`) {
      this.stopLevelTimer();
      this.nextGame();
    } else {
      this.stopGame();
      this.isOver(this.model.state, this.model.userAnswers);
    }
  }

  isOver() {}
}

export default GamePresenter;
