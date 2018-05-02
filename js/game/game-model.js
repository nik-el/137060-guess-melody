import {INITIAL_STATE} from './game-data';
import {GameRules} from './game-data';

class GameModel {
  constructor(levels) {
    this.levels = levels;
    this.userAnswers = [];
    this.restart();
  }

  get state() {
    return this._state;
  }

  restart() {
    this._state = INITIAL_STATE;
    this.userAnswers = [];
  }

  get currentLevelData() {
    return this.levels[this._state.level];
  }

  isOver() {
    return this._state.mistakes > GameRules.AVAILABLE_MISTAKES;
  }

  tick() {
    if (typeof this._state.time !== `number` || this._state.time < 0) {
      return null;
    }
    if (!this._state.time) {
      return -1;
    }
    return --this._state.time;
  }

  changeLevel() {
    if (this.isOver()) {
      this._state.level = `result`;
    } else {
      this._state.level = this.levels[this._state.level].next;
    }
  }
}

export default GameModel;
