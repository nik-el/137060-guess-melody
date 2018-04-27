import AbstractView from './abstract-view';


export default class genreAnswers extends AbstractView {
  constructor(answers) {
    super();

    this.answers = answers;
  }

  get template() {
    return this.answers
        .map(({src}, index) => (
          `<div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio src=${src}></audio>
                <button class="player-control player-control--play"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value=${index} id="a-${index}">
            <label class="genre-answer-check" for="a-${index}"></label>
          </div>
        `))
        .join(``);
  }

  onAnswerSelected() {}

  bind() {}
}
