import { createElement } from '../utils/createElement';
import { router } from '../router';

import { getUrPagination } from '../utils/getUrPagination';

export const renderPagination = (wrapper, page, pages, count) => {
  wrapper.textContent = '';

  const paginationList = createElement(
    'ul',
    {
      className: 'pagination__list',
    },
    {
      parent: wrapper,
    },
  );

  const isNOtStart = page - Math.floor(count / 2) > 1;
  const isEnd = page + Math.floor(count / 2) >= pages;

  if (count > pages) {
    count = pages;
  }

  for (let i = 0; i < count; i++) {
    let n = i + 1;

    if (isNOtStart) {
      if (isEnd) {
        n = pages - count + i + 1;
      } else {
        n = page - Math.floor(count / 2) + i;
      }
    }

    createElement(
      'li',
      {
        className: 'pagination__item',
      },
      {
        parent: paginationList,
        child: createElement('a', {
          className: `pagination__link ${
            page === n ? 'pagination__link_active' : ''
          }`,
          textContent: n,
          href: getUrPagination(n),
        }),
      },
    );
  }

  if (pages > count) {
    createElement(
      'a',
      {
        className: `pagination__arrow pagination__arrow_start ${
          page > 2 ? '' : 'pagination__arrow_disabled'
        }`,
        href: getUrPagination(1),
        tabIndex: !isNOtStart ? '-1' : '0',
        innerHTML: `
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 15.06L10.9096 12L14 8.94L13.0486 8L9 12L13.0486 16L14 15.06Z" 
            />
        </svg> 
        `,
        ariaLabel: 'Перейти на первую страницу',
      },
      {
        parent: wrapper,
      },
    );
    createElement(
      'a',
      {
        className: `pagination__arrow pagination__arrow_end ${
          isEnd ? 'pagination__arrow_disabled' : ''
        }`,
        href: getUrPagination(pages),
        tabIndex: isEnd ? '-1' : '0',

        innerHTML: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 15.06L13.0904 12L10 8.94L10.9514 8L15 12L10.9514 16L10 15.06Z" />
        </svg>
        `,
        ariaLabel: 'Перейти на последнюю страницу',
      },
      {
        parent: wrapper,
      },
    );
  }
};
