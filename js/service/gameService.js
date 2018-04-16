import renderWelcomeScreen from '../screens/welcome';
import renderGenreScreen from '../screens/genre';
import renderArtistScreen from '../screens/artist';
import renderResultScreen from '../screens/result';
import getScore from './getScore';
import {getRandomInt} from '../helpers';
import {currentAnswers, currentResult, INITIAL_STATE} from '../data/gameData';

const pushNextLevel = (nextLevel) => {
  if (currentResult.mistakes < 0) {
    renderResultScreen();
    return;
  } else if ((nextLevel).indexOf(`artist`) !== -1) {
    renderArtistScreen(nextLevel);
  } else if ((nextLevel).indexOf(`genre`) !== -1) {
    renderGenreScreen(nextLevel);
  } else if (nextLevel === `end`) {
    currentResult.score = getScore(currentAnswers, currentResult.mistakes);
    renderResultScreen();
  }
};

const checkAnswer = (answer) => {
  if (!answer) {
    --currentResult.mistakes;
  }
  currentAnswers.push({
    isCorrect: answer,
    time: getRandomInt(20, 40),
  });
};

const resetGame = () => {
  const {score, mistakes, time} = INITIAL_STATE;
  currentResult.score = score;
  currentResult.mistakes = mistakes;
  currentResult.time = time;

  currentAnswers.length = 0;

  renderWelcomeScreen();
};

export {pushNextLevel, checkAnswer, resetGame};
