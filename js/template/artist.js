export default (level) => {

  const artistsContainer = document.createElement(`div`);
  artistsContainer.className = `main-wrap`;
  artistsContainer.innerHTML = `
    <h2 class="title main-title">Кто исполняет эту песню?</h2>
    <div class="player-wrapper">
      <div class="player">
        <audio src=${level.track}></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
  `;

  const answersContainer = document.createElement(`form`);
  answersContainer.className = `main-list`;
  answersContainer.innerHTML = level.answers.map((answer, index) =>{
    answer = `<div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="artist-${index}" name="answer" value="${index}">
        <label class="main-answer" for="artist-${index}">
          <img class="main-answer-preview" src=${answer.img}
               alt=${answer.artist} width="134" height="134">
          ${answer.artist}
        </label>
      </div>
    `;
    return answer;
  }).join(``);

  artistsContainer.appendChild(answersContainer);
  return artistsContainer.innerHTML;
};

