const getElementFromTemplate = (screenTemplate) => {
  const newScreen = document.createElement(`section`);
  newScreen.className = `screen`;
  newScreen.innerHTML = screenTemplate;
  return newScreen;
};

export default getElementFromTemplate;
