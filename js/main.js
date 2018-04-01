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

const currentScreen = document.querySelector(`.screen`);
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


const reserAnswer = () => {
  sendGenreAnswer.disabled = true;
  genresAnswer.forEach((answer) => {
    answer.checked = false;
  });
};

// переключение экранов
const goToWelcomeScreen = () => {
  reserAnswer();
  renderScreen(Templates.WELCOME, currentScreen);
};
const goToArtistLevelScreen = () => {
  renderScreen(Templates.ARTIST_LEVEL, currentScreen);
};
const goToGenreLevelScreen = () => {
  checkIsGenreAnswerActive();
  renderScreen(Templates.GENRE_LEVEL, currentScreen);
};
const goToResultSceen = () => {
  const resultsArray = [`RESULT_SUCCESS`, `RESULT_FAIL_TIME`, `RESULT_FAIL_ATTEMPS`];
  const randomResult = Math.floor(Math.random() * resultsArray.length);
  renderScreen(Templates[resultsArray[randomResult]], currentScreen);
};

playGame.addEventListener(`click`, goToArtistLevelScreen);
artistsAnswer.forEach((answer) => {
  answer.addEventListener(`click`, goToGenreLevelScreen);
});
genresAnswer.forEach((answer) => {
  answer.addEventListener(`click`, checkIsGenreAnswerActive);
});
sendGenreAnswer.addEventListener(`click`, goToResultSceen);
replayGame.forEach((replay) => {
  replay.addEventListener(`click`, goToWelcomeScreen);
});

// показываем экран приветствия
goToWelcomeScreen();


// const templateScreens = templates.content.querySelectorAll(`section.main`);
// const templates = document.getElementById(`templates`);
// const Keys = {
//   ARROW_LEFT_KEY: 37,
//   ARROW_RIGHT_KEY: 39,
// };
// let currentScreenId = 0;
//
//
// const isArrowRightKey = (keyCode) => {
//   return keyCode === Keys.ARROW_RIGHT_KEY;
// };
// const isArrowLeftKey = (keyCode) => {
//   return keyCode === Keys.ARROW_LEFT_KEY;
// };

// const renderScreen = (screenId) => {
//   currentScreen.innerHTML = ``;
//   currentScreen.appendChild(templateScreens[screenId]);
// };

// const renderNextScreen = () => {
//   if (currentScreenId < templateScreens.length - 1) {
//     currentScreenId++;
//     renderScreen(currentScreenId, currentScreen);
//   }
// };
// const renderPreviousScreen = () => {
//   if (currentScreenId > 0) {
//     currentScreenId--;
//     renderScreen(currentScreenId);
//   }
// };
//
// const arrowKeysHandler = (event) => {
//   if (!event.altKey) {
//     return;
//   }
//   if (isArrowRightKey(event.keyCode)) {
//     renderNextScreen();
//   } else if (isArrowLeftKey(event.keyCode)) {
//     renderPreviousScreen();
//   }
// };
// document.addEventListener(`keydown`, arrowKeysHandler, event);
