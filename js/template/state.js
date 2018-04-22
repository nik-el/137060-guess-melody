import {getTimerFormat} from '../helpers';

export default (game) => {
  const currentState = game.state;
  const currentTime = getTimerFormat(currentState.time);

  const gameStateContainer = document.createElement(`div`);
  gameStateContainer.innerHTML = `
    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">${currentTime.minutes}</span><!--
   --><span class="timer-value-dots">:</span><!--
   --><span class="timer-value-secs">${currentTime.seconds}</span>
    </div>
      
    <div class="main-mistakes">
    ${new Array(currentState.mistakes)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
    </div>
  `;
  return gameStateContainer.innerHTML;
};


