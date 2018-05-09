import {INITIAL_STATE} from './game-data';
import {GameRules} from './game-data';
import {GameStates} from './game-data';

class GameModel {
  constructor(data) {
    this.levels = data.questions;
    this.tracks = data.tracks;
    this.status = true;
    this.userAnswers = [];
    this._restart();
  }

  get state() {
    return this._state;
  }

  get currentLevelData() {
    return this.levels[this._state.level];
  }

  _restart() {
    this._state = Object.assign({}, INITIAL_STATE);
    this.userAnswers = [];
  }

  tick() {
    if (this._state.time < 0) {
      return null;
    }
    if (!this._state.time) {
      return -1;
    }
    return --this._state.time;
  }

  isOver() {
    return this._state.mistakes > GameRules.AVAILABLE_MISTAKES;
  }

  changeLevel() {
    if (this.isOver()) {
      this.status = false;
      this._state.level = GameStates.RESULT;
    } else {
      this._state.level = this.levels[this._state.level].next;
    }
  }
}

export default GameModel;
