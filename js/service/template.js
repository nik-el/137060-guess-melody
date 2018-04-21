const app = document.querySelector(`.app`);

const getElementFromTemplate = (screenTemplate) => {
  const newScreen = document.createElement(`section`);
  newScreen.className = `screen`;
  newScreen.innerHTML = screenTemplate;
  return newScreen;
};

const renderScreen = (node) => {
  const currentScreen = app.querySelector(`.screen`);
  if (currentScreen) {
    app.removeChild(currentScreen);
  }
  return app.insertBefore(node, app.firstChild);
};

export {getElementFromTemplate, renderScreen};
