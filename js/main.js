import welcomeNode from './templates/welcome';
import artistLevelNode from './templates/level-artist';
import genreLevelNode from './templates/level-genre';
import resultSuccessNode from './templates/result-success';
import resultFailTimeNode from './templates/result-fail-time';
import resultFailAttemptsNode from './templates/result-fail-attempts';
import renderScreen from './service/render-screen';

const Templates = {
  WELCOME: welcomeNode,
  ARTIST_LEVEL: artistLevelNode,
  GENRE_LEVEL: genreLevelNode,
  RESULT_SUCCESS: resultSuccessNode,
  RESULT_FAIL_TIME: resultFailTimeNode,
  RESULT_FAIL_ATTEMPS: resultFailAttemptsNode
};

const application = document.querySelector(`.app`);
const playGame = welcomeNode.querySelector(`.main-play`);
const artistsAnswer = artistLevelNode.querySelectorAll(`.main-answer`);
const genresAnswer = genreLevelNode.querySelectorAll(`.genre-answer input`);
const sendGenreAnswer = genreLevelNode.querySelector(`.genre-answer-send`);
const replayGame = [
  resultSuccessNode.querySelector(`.main-replay`),
  resultFailTimeNode.querySelector(`.main-replay`),
  resultFailAttemptsNode.querySelector(`.main-replay`),
];

const checkIsGenreAnswerActive = () => {
  genresAnswer.forEach((answer) => {
    if (answer.checked) {
      sendGenreAnswer.disabled = false;
    }
  });
};

const resetAnswer = () => {
  sendGenreAnswer.disabled = true;
  genresAnswer.forEach((answer) => {
    answer.checked = false;
  });
};

// переключение экранов
const goToWelcomeScreen = () => {
  resetAnswer();
  renderScreen(Templates.WELCOME, application);
};
const goToArtistLevelScreen = () => {
  renderScreen(Templates.ARTIST_LEVEL, application);
};
const goToGenreLevelScreen = () => {
  checkIsGenreAnswerActive();
  renderScreen(Templates.GENRE_LEVEL, application);
};
const goToResultScreen = () => {
  const resultsArray = [`RESULT_SUCCESS`, `RESULT_FAIL_TIME`, `RESULT_FAIL_ATTEMPS`];
  const randomResult = Math.floor(Math.random() * resultsArray.length);
  renderScreen(Templates[resultsArray[randomResult]], application);
};

// переход к артистам
playGame.addEventListener(`click`, goToArtistLevelScreen);
// переход к жанрам
artistsAnswer.forEach((answer) => {
  answer.addEventListener(`click`, goToGenreLevelScreen);
});
// проверка выбранных ответов
genresAnswer.forEach((answer) => {
  answer.addEventListener(`click`, checkIsGenreAnswerActive);
});
// переход к результатам
sendGenreAnswer.addEventListener(`click`, goToResultScreen);
// начать новую игру
replayGame.forEach((replay) => {
  replay.addEventListener(`click`, goToWelcomeScreen);
});

// показываем экран приветствия
goToWelcomeScreen();
