'use strict';
import icons from '../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the receieved object to the DOM.
   * @param {Object | Object[]} data The data to be rendered. (e.g recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM.
   * @returns {undefined | string} A markup string is returned if render is false.
   * @this {Object} View instance
   * @author Truce Ramcharitar
   * @todo Finish implementation.
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clearMarkup();
    this._insertMarkup(markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clearMarkup() {
    this._parentElement.innerHTML = '';
  }

  _insertMarkup(markup) {
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
        </div>`;

    this._clearMarkup();
    this._insertMarkup(markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    this._clearMarkup();
    this._insertMarkup(markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    this._clearMarkup();
    this._insertMarkup(markup);
  }
}
