const app = document.querySelector(`.app`);

const renderScreen = (node) => {
  const currentScreen = app.querySelector(`.screen`);
  if (currentScreen) {
    app.removeChild(currentScreen);
  }
  return app.insertBefore(node, app.firstChild);
};

const getElementFromTemplate = (screenTemplate) => {
  const newScreen = document.createElement(`section`);
  newScreen.className = `screen`;
  newScreen.innerHTML = screenTemplate;
  return newScreen;
};

export {getElementFromTemplate, renderScreen};
