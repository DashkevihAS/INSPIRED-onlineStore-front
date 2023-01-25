import { searchController } from '../controllers/searchController.js';
import { createElement } from '../utils/createElement.js';

export const search = createElement('div', {
  className: 'search',
});

export const searchToggle = () => {
  search.classList.toggle('search_show');
};

const container = createElement(
  'div',
  {
    className: 'container search__container',
  },
  {
    parent: search,
  },
);

const form = createElement(
  'form',
  {
    className: 'search__form',
  },
  {
    parent: container,
    cb: searchController,
  },
);

createElement(
  'input',
  {
    className: 'search__input',
    type: 'search',
    name: 'search',
    placeholder: 'Найти...',
  },
  {
    parent: form,
  },
);

createElement(
  'button',
  {
    className: 'search__btn',
    type: 'submit',
    textContent: 'Искать',
  },
  {
    parent: form,
  },
);
