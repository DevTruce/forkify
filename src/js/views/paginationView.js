import icons from '../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('right');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('left');
    }

    // Middle page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('left') + this._generateMarkupButton('right')
      );
    }

    // Page 1 and there are NO other pages
    return;
  }

  _generateMarkupButton(type) {
    const curPage = this._data.page;

    if (type === 'left') {
      const markupLeftArrow = `
        <button data-goto=' ${
          curPage - 1
        }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
      `;
      return markupLeftArrow;
    }
    if (type === 'right') {
      const markupRightArrow = `
        <button data-goto=' ${
          curPage + 1
        }' class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
      return markupRightArrow;
    }
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();

      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
}

export default new PaginationView();
