import AbstractView from './abstract-view';

export default class artistAnswersView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
  }

  get template() {
    return ` <form class="main-list">
      ${this.answers.map((answer, index) => `
          <div class="main-answer-wrapper">
            <input class="main-answer-r" type="radio" id="artist-${index}" name="answer" value="${index}">
            <label class="main-answer" for="artist-${index}">
              <img class="main-answer-preview" src=${answer.img}
                   alt=${answer.artist} width="134" height="134">
              ${answer.artist}
            </label>
          </div>
      `).join(``)}
  </form>
  `;
  }

  onAnswerSelected() {}

  bind() {}
}
