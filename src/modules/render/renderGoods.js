import { getData } from '../getData';
import { API_URL, DATA } from '../const';
import { createElement } from '../createElement';

export const renderGoods = async (title, params) => {
  const goodsElem = document.querySelector('.goods');
  goodsElem.textContent = '';

  const goods = await getData(`${API_URL}/api/goods`, params);

  const container = createElement(
    'div',
    {
      className: 'container',
    },
    {
      parrent: goodsElem,
      child: createElement('h2', {
        className: 'goods__title',
        textContent: title,
      }),
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
          class="product__btn-favorite" 
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

    const colorsList = createElement(
      'ul',
      {
        className: 'product__color-list',
      },
      {
        parrent: article,
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

  const productsList = createElement(
    'ul',
    {
      className: 'goods__list',
    },
    {
      childs: listCards,
    },
  );

  container.append(productsList);

  // <ul class='product__color-list'>
  //   <li class='product__color-item'>
  //     <div class='color color_red color_check'></div>
  //   </li>
  //   <li class='product__color-item'>
  //     <div class='color color_white'></div>
  //   </li>
  //   <li class='product__color-item'>
  //     <div class='color color_black'></div>
  //   </li>
  // </ul>;
};
