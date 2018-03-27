const templates = document.getElementById(`templates`);
const templateScreensArray = templates.content.querySelectorAll(`section.main`);

/**
 *  Устанавливаем начальный экран.
 */
const app = document.querySelector(`.app`);
const firstAppScreen = document.querySelector(`section.main`);
let numberOfScreen = 0;
app.replaceChild(templateScreensArray[numberOfScreen], firstAppScreen);

/**
 *  Ловим нажатие клавиш [Alt + ← и Alt + →] и переключаем экран.
 */
let keyControl = {};
document.addEventListener(`keydown`, (e)=>{
  const currentAppScreen = document.querySelector(`section.main`);
  keyControl[e.key] = e.type === `keydown`;
  if (keyControl.Alt && keyControl.ArrowRight && numberOfScreen < templateScreensArray.length - 1) {
    numberOfScreen++;
    app.replaceChild(templateScreensArray[numberOfScreen], currentAppScreen);
  } else if (keyControl.Alt && keyControl.ArrowLeft && numberOfScreen > 0) {
    numberOfScreen--;
    app.replaceChild(templateScreensArray[numberOfScreen], currentAppScreen);
  }
});
document.addEventListener(`keyup`, (e)=>{
  if (e.key !== `Alt` && keyControl.Alt) {
    keyControl = {Alt: true};
  } else {
    keyControl = {};
  }
});
