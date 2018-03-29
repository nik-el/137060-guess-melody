const templates = document.getElementById(`templates`);
const templateScreens = templates.content.querySelectorAll(`section.main`);
const currentScreen = document.querySelector(`.screen`);

const keys = {
  arrowLeftKey: 37,
  arrowRightKey: 39,
};
let currentScreenId = 0;


const isArrowRightKey = (keyCode) => {
  return keyCode === keys.arrowRightKey;
};
const isArrowLeftKey = (keyCode) => {
  return keyCode === keys.arrowLeftKey;
};

const renderScreen = (screenId) => {
  currentScreen.innerHTML = ``;
  currentScreen.appendChild(templateScreens[screenId]);
};

const switchScreen = () => {
  document.addEventListener(`keydown`, (event) => {
    if (!event.altKey) {
      return;
    }
    if (isArrowRightKey(event.keyCode) && currentScreenId < templateScreens.length - 1) {
      currentScreenId++;
      renderScreen(currentScreenId);
    } else if (isArrowLeftKey(event.keyCode) && currentScreenId > 0) {
      currentScreenId--;
      renderScreen(currentScreenId);
    }
  });
};

renderScreen(currentScreenId);
switchScreen();

