import levels from './levels';
import getScore from '../service/getScore';

import {INITIAL_STATE} from './game';

const AVAILABLE_MISTAKES = 3;

class GameModel {
  constructor() {
    this.levels = levels;
    this.userAnswers = [];
    this.restart();
  }

  get state() {
    return this._state;
  }

  restart() {
    this._state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.userAnswers = [];
  }

  get CurrentLevel() {
    return this._state.level;
  }

  get currentLevelData() {
    return this.levels[this._state.level];
  }

  isOver() {
    return this._state.mistakes >= AVAILABLE_MISTAKES;
  }

  tick() {
    if (typeof this._state.time !== `number` || this._state.time < 0) {
      return null;
    }

    if (!this._state.time) {
      return -1;
    }

    --this._state.time;
  }


  // changeLevel() {
  //   if (this.state.mistakes > AVAILABLE_MISTAKES) {
  //     this.currentLevel = `result`;
  //   } else {
  //     this.currentLevel = this.levels[this.currentLevel].next;
  //   }
  //
  //   this.renderGameScreen();
  // }

  // get currentLevelData() {
  //   return this.levels[this.currentLevel];
  // }



  // resetGame() {
  //   this.state = {
  //     mistakes: 0,
  //     time: 300,
  //     score: 0,
  //   };
  //   this.currentLevel = `artist-1`;
  //   this.userAnswers = [];
  //   renderWelcomeScreen();
  // }

  // renderGameScreen() {
  //   switch (this.currentLevelData.type) {
  //     case `result`: {
  //       this.state.score = getScore(this.userAnswers, this.state.mistakes);
  //       renderResultScreen(this.state, this.userAnswers);
  //       break;
  //     }
  //     case `artist`: {
  //       renderArtistScreen(this.state, this.currentLevelData);
  //       break;
  //     }
  //     case `genre`: {
  //       renderGenreScreen(this.state, this.currentLevelData);
  //       break;
  //     }
  //   }
  // }
}

export default GameModel;

// const initGame = () => {
//   game = new Game();
//   renderWelcomeScreen();
// };

// export {initGame, game, AVAILABLE_MISTAKES};
