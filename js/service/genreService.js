export default (level) => {

  const genreContainer = document.createElement(`div`);
  genreContainer.className = `main-wrap`;
  genreContainer.innerHTML = `      
      <h2 class="title">Выберите ${level.genre} треки</h2>
  `;

  const answersContainer = document.createElement(`form`);
  answersContainer.className = `genre`;
  answersContainer.innerHTML = level.answers.map((answer, index) =>{
    answer = `<div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src=${answer.src}></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value=${index} id="a-${index}">
          <label class="genre-answer-check" for="a-${index}"></label>
        </div>
    `;
    return answer;
  }).join(``) + `<button class="genre-answer-send" type="submit" disabled="">Ответить</button>`;

  genreContainer.appendChild(answersContainer);

  return genreContainer.innerHTML;
};

