import AbstractView from './abstract-view';

export default class ErrorScreenView extends AbstractView {
  constructor(error) {
    super();

    this.error = error;
  }

  get template() {
    return `
      <secton class="main">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>      
      </secton>
    `;
  }

}
