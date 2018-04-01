const renderScreen = (template, currentScreen) => {
  currentScreen.innerHTML = ``;
  currentScreen.appendChild(template);
}

export default renderScreen;
