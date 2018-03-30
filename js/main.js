const templates = document.getElementById(`templates`);
const templateScreens = templates.content.querySelectorAll(`section.main`);
const currentScreen = document.querySelector(`.screen`);

const Keys = {
  ARROW_LEFT_KEY: 37,
  ARROW_RIGHT_KEY: 39,
};
let currentScreenId = 0;


const isArrowRightKey = (keyCode) => {
  return keyCode === Keys.ARROW_RIGHT_KEY;
};
const isArrowLeftKey = (keyCode) => {
  return keyCode === Keys.ARROW_LEFT_KEY;
};

const renderScreen = (screenId) => {
  currentScreen.innerHTML = ``;
  currentScreen.appendChild(templateScreens[screenId]);
};
const renderNextScreen = () => {
  if (currentScreenId < templateScreens.length - 1) {
    currentScreenId++;
    renderScreen(currentScreenId);
  }
};
const renderPreviousScreen = () => {
  if (currentScreenId > 0) {
    currentScreenId--;
    renderScreen(currentScreenId);
  }
};

const arrowKeysHandler = (event) => {
  if (!event.altKey) {
    return;
  }
  if (isArrowRightKey(event.keyCode)) {
    renderNextScreen();
  } else if (isArrowLeftKey(event.keyCode)) {
    renderPreviousScreen();
  }
};

renderScreen(currentScreenId);
document.addEventListener(`keydown`, arrowKeysHandler, event);


