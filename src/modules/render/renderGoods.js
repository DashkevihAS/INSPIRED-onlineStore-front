import { getData } from '../getData';
import { API_URL, COUNT_PAGINATION, DATA, goodsElem } from '../const';
import { createElement } from '../utils/createElement';
import { renderPagination } from './renderPagination';
import { getFavorite } from '../controllers/favoriteController';

export const renderGoods = async ({ title, params, render }) => {
  goodsElem.textContent = '';

  if (!render) return;

  const data = await getData(`${API_URL}/api/goods`, params);
  const goods = Array.isArray(data) ? data : data.goods;

  if (!goods.length || (params.list && !params.list.length)) {
    createElement(
      'h3',
      {
        className: 'goods__message',
        textContent: 'По вашему запросу ничего не найдено',
      },
      {
        parent: createElement(
          'div',
          {
            className: 'container',
          },
          {
            parent: goodsElem,
            child: createElement(
              'h2',
              {
                className: 'goods__title',
                textContent: title,
              },
              {
                child: createElement('sup', {
                  className: 'goods__title-sup',
                  textContent: ' (0)',
                }),
                parent: container,
              },
            ),
          },
        ),
      },
    );

    return;
  }

  const favoriteList = getFavorite();

  const container = createElement(
    'div',
    {
      className: 'container',
    },
    {
      parent: goodsElem,
    },
  );

  createElement(
    'h2',
    {
      className: 'goods__title',
      textContent: title,
    },
    {
      child: createElement('sup', {
        className: 'goods__title-sup',
        textContent: data?.totalCount ? ` (${data?.totalCount})` : '',
      }),
      parent: container,
    },
  );

  const listCards = goods.map((product) => {
    const article = createElement('article', {
      className: 'product',
      innerHTML: `
      <a href="#/product/${product.id}" class="product__link">
        <img class="product__image"
          src="${API_URL}/${product.pic}"  alt=${product.title}
        />
        <h3 class="product__title"> ${product.title} </h3>
      </a>
      <div class="product__row">
        <p class="product__price">руб ${product.price}</p>
        <button 
          class="favorite ${
            favoriteList.includes(product.id) ? 'favorite_active' : ''
          }" 
          aria-label="добавить в избранное" 
          data-id=${product.id} ></button>
      </div>
      `,
    });

    const li = createElement(
      'li',
      {
        className: 'goods__item',
      },
      {
        child: article,
      },
    );

    createElement(
      'ul',
      {
        className: 'product__color-list',
      },
      {
        parent: article,
        childs: product.colors.map((colorId, i) => {
          const color = DATA.colors.find((item) => item.id === colorId);
          return createElement(
            'li',
            {
              className: 'product__color-item',
            },
            {
              child: createElement('div', {
                className: `color color_${color.title} ${
                  i ? '' : 'color_check'
                }`,
              }),
            },
          );
        }),
      },
    );

    return li;
  });

  createElement(
    'ul',
    {
      className: 'goods__list',
    },
    {
      parent: container,
      childs: listCards,
    },
  );

  if (data.pages && data.pages > 1) {
    const pagination = createElement(
      'div',
      {
        className: 'goods__pagination pagination',
      },
      {
        parent: container,
      },
    );

    renderPagination(pagination, data.page, data.pages, COUNT_PAGINATION);
  }
};
