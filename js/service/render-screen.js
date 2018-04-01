const renderScreen = (template, app) => {
  const currentScreen = app.querySelector(`.screen`);
  app.removeChild(currentScreen);
  app.insertBefore(template, app.firstChild);
};

export default renderScreen;
