import AbstractView from './abstract-view';

export default class ErrorScreenView extends AbstractView {
  constructor(error) {
    super();

    this.error = error;
  }

  get template() {
    return `
      <secton class="main">
        <p class="error-text">Произошла ошибка ${this.error.message}</p>
      </secton>
    `;
  }
}
