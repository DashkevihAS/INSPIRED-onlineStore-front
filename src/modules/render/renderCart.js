import { cart } from '../const';
import { createElement } from '../utils/createElement';
import { addProductCart, getCart } from '../controllers/cartController';
import { removeProductCart } from '../controllers/cartController';
import { getData } from '../getData';
import { API_URL } from '../const';
import { renderCount } from '../render/renderCount';

export const renderCart = ({ render }) => {
  cart.textContent = '';

  if (!render) return;

  const container = createElement(
    'div',
    {
      className: 'container',
      innerHTML: '<h2 class="cart__title">Корзина</h2>',
    },
    {
      parent: cart,
    },
  );

  const cartList = createElement(
    'ul',
    {
      className: 'cart__list',
    },
    {
      parent: container,
    },
  );

  const cartTotal = createElement(
    'div',
    {
      className: 'cart__total',
      innerHTML: '<p class="cart__total-title">Итого:</p>',
    },
    {
      parent: container,
    },
  );

  const totalPrice = createElement(
    'p',
    {
      className: 'cart__total-price',
      textContent: 'руб 0',
    },
    {
      parent: cartTotal,
    },
  );

  getCart().forEach(async (product) => {
    const data = await getData(`${API_URL}/api/goods/${product.id}`);

    const { id, count, color, size } = product;
    const { pic, title, price } = data;

    const btnDelete = createElement(
      'button',
      {
        className: 'item__del',
        ariaLabel: 'Удалить товар из корзины',
      },
      {
        cb(btn) {
          btn.dataset.id = id;
          btn.dataset.color = color;
          btn.dataset.size = size;
        },
      },
    );

    const countBlock = renderCount(count, 'item__count', (count) => {
      product.count = count;
      addProductCart(product, true);
    });

    createElement(
      'article',
      {
        className: 'item',
        innerHTML: `
          <img
            src=${API_URL}/${pic}
            alt=${title}
            class="item__image"
          />

          <div class="item__content">
            <h3 class="item__title">${title}</h3>

            <p class="item__price">руб ${price}</p>

            <div class="item__vendor-code">
              <span class="item__subtitle">Артикул</span>
              <span class="item__id">${id}</span>
            </div>
          </div>

          <div class="item__prop">
            <div class="item__color">
              <p class="item__subtitle item__color-title">Цвет</p>

              <div
                class="item__color-item color color_${product.color} color_check"
              ></div>
            </div>

            <div class="item__size">
              <p class="item__subtitle item__size-title">Размер</p>

              <div class="item__size-item size">${product.size}</div>
            </div>
          </div>

        `,
      },
      {
        parent: createElement(
          'li',
          {
            className: 'cart__item',
          },
          {
            parent: cartList,
          },
        ),
        childs: [btnDelete, countBlock],
      },
    );
  });
};
