const templates = document.getElementById(`templates`);
const templateScreens = templates.content.querySelectorAll(`section.main`);

/**
 *  Устанавливаем начальный экран.
 */
const currentScreen = document.querySelector(`.screen`);
let currentScreenId = 0;
const renderScreen = (screenId) => {
  currentScreen.innerHTML = ``;
  currentScreen.appendChild(templateScreens[screenId]);
};
renderScreen(currentScreenId);

/**
 *  Ловим нажатие клавиш [Alt + ← и Alt + →] и переключаем экран.
 */
document.addEventListener(`keydown`, (event)=>{
  if (!event.altKey) {
    return;
  }
  if (event.key === `ArrowRight` && currentScreenId < templateScreens.length - 1) {
    currentScreenId++;
    renderScreen(currentScreenId);
  } else if (event.key === `ArrowLeft` && currentScreenId > 0) {
    currentScreenId--;
    renderScreen(currentScreenId);
  }
});
