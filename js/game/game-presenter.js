import HeaderView from '../views/header-view';
import ArtistView from '../views/artist-view';
import GenreView from '../views/genre-view';
import getScore from '../service/get-score';

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
    this._startGameTimer();
    this._nextGame();
  }

  _startGameTimer() {
    this._interval = setInterval(() => {
      if (this.model.state.time <= 0) {
        this.model.status = false;
        this._stopGame();
      }
      this.model.tick();
      this._updateHeader();
    }, 1000);
  }

  _stopGameTimer() {
    clearInterval(this._interval);
  }

  _startLevelTimer() {
    this.levelTime = 0;
    this._levelInterval = setInterval(() => {
      this.levelTime++;
    }, 1000);
  }

  _stopLevelTimer() {
    clearInterval(this._levelInterval);
    this.levelTime = null;
  }

  _stopGame() {
    this._stopGameTimer();
    this._stopLevelTimer();
    if (this.model.status) {
      this.model.state.score = getScore(this.model.userAnswers, this.model.state.mistakes);
    }
    this.isOver(this.model.state, this.model.userAnswers, this.model.status, this.model.state.score);
  }

  _updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  _nextGame() {
    this._updateHeader();
    this._startLevelTimer();

    const game = this.game;
    game.sendAnswerClickHandler = this._rememberAnswer.bind(this);
    this._updateGame(game);
  }

  get element() {
    return this.root;
  }

  _updateGame(view) {
    this.root.replaceChild(view.element, this.currentGame.element);
    this.currentGame = view;
  }

  _rememberAnswer(answersIndex) {
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
      this._stopLevelTimer();
      this._nextGame();
    } else {
      this._stopGame();
    }
  }

  isOver() {}
}

export default GamePresenter;
