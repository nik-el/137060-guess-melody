import welcomeNode from './templates/welcome';

const app = document.querySelector(`.app`);
const renderScreen = (template) => {
  const currentScreen = app.querySelector(`.screen`);
  if (currentScreen) {
    app.removeChild(currentScreen);
  }
  app.insertBefore(template, app.firstChild);
};

const getElementFromTemplate = (screenTemplate) => {
  const newScreen = document.createElement(`section`);
  newScreen.className = `screen`;
  newScreen.innerHTML = screenTemplate;
  return newScreen;
};

const startNewGame = () => {
  renderScreen(welcomeNode);
};


export {getElementFromTemplate, renderScreen, startNewGame};
