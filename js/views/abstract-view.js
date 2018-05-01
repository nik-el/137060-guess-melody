import {getElementFromTemplate} from '../service/template';

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can not create example of AbstractView, only the new one class`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {}
}

export default AbstractView;
