import { card, DATA } from '../const';
import { createElement } from '../utils/createElement';
import { API_URL } from '../const';
import { renderCount } from './renderCount';
import { handlerFavorite } from '../controllers/favoriteController';
import { getFavorite } from '../controllers/favoriteController';
import { addProductCart } from '../controllers/cartController';

export const renderCard = (data) => {
  card.textContent = '';

  if (!data) return;

  const { colors, id, title, description, price, pic, size: sizes } = data;

  const container = createElement(
    'div',
    {
      className: 'container card__container',
    },
    {
      parrent: card,
    },
  );
  createElement(
    'img',
    {
      className: 'card__image',
      src: `${API_URL}/${pic}`,
      alt: title,
    },
    {
      parrent: container,
    },
  );

  const form = createElement(
    'form',
    {
      classNme: 'card__content',
      id: 'order',
    },
    {
      parrent: container,
      cb(form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();

          if (!form.size.value) {
            const invalidMessage = createElement(
              'p',
              {
                className: 'card__alert',
                textContent: 'Выберите размер',
              },
              {
                parrent: form,
              },
            );
            setTimeout(() => {
              invalidMessage.remove();
            }, 2000);
            return;
          }

          const formData = new FormData(form);
          const product = Object.fromEntries(formData);
          addProductCart(product);
        });
      },
    },
  );

  createElement(
    'h2',
    {
      className: 'card__title',
      textContent: title,
    },
    {
      parrent: form,
    },
  );
  createElement(
    'p',
    {
      className: 'card__price',
      textContent: `руб ${price}`,
    },
    {
      parrent: form,
    },
  );

  const vendorCode = createElement(
    'div',
    {
      className: 'card__vendor-code',
    },
    {
      parrent: form,
    },
  );

  createElement(
    'span',
    {
      className: 'card__subtitle',
      textContent: `Артикул`,
    },
    {
      parrent: vendorCode,
    },
  );
  createElement(
    'span',
    {
      className: 'card__id',
      textContent: id,
    },
    {
      parrent: vendorCode,
    },
  );
  createElement(
    'input',
    {
      type: 'hidden',
      name: 'id',
      value: id,
    },
    {
      parrent: vendorCode,
    },
  );

  createElement(
    'div',
    {
      className: 'card__color',
      innerHTML: `<p class="card__subtitle card__color-title">Цвет</p>`,
    },
    {
      parrent: form,
      child: createElement(
        'div',
        {
          className: 'card__color-list',
        },
        {
          cb(colorList) {
            colors.forEach((colorId, i) => {
              const color = DATA.colors.find(
                (color) => color.id === colorId,
              ).title;

              const label = createElement(
                'label',
                {
                  className: `card__color-item color color_${color}`,
                },
                {
                  parrent: colorList,
                  child: createElement('input', {
                    className: 'color__input input-hide',
                    type: 'radio',
                    name: 'color',
                    value: color,
                    checked: !i,
                  }),
                },
              );

              createElement(
                'span',
                {
                  className: 'color__check',
                },
                {
                  parrent: label,
                },
              );
            });
          },
        },
      ),
    },
  );

  createElement(
    'div',
    {
      className: 'card__size',
      innerHTML: `<p class="card__subtitle card__size-title">Размер</p>`,
    },
    {
      parrent: form,
      child: createElement(
        'div',
        {
          className: 'card__size-list',
        },
        {
          cb(sizeList) {
            sizes.forEach((size, i) => {
              const label = createElement(
                'label',
                {
                  className: `card__size-item  ${size}`,
                },
                {
                  parrent: sizeList,
                  child: createElement('input', {
                    className: 'size__input input-hide',
                    type: 'radio',
                    name: 'size',
                    value: size,
                  }),
                },
              );

              createElement(
                'span',
                {
                  className: 'size__check',
                  textContent: size,
                },
                {
                  parrent: label,
                },
              );
            });
          },
        },
      ),
    },
  );

  form.insertAdjacentHTML(
    'beforeend',
    `
  <div class="card__description">
    <p class="card__subtitle card__description-title">Описание</p>

    <p class="card__description-text">
      ${description}
    </p>
  </div>
  `,
  );

  const count = renderCount(1);

  const addCard = createElement('button', {
    className: 'card__add-cart main-button',
    type: 'submit',
    textContent: 'В корзину',
  });
  const addFavorite = createElement(
    'button',
    {
      className: `card__favorite favorite
      ${getFavorite().includes(id) ? 'favorite_active' : ''}`,
      type: 'button',
      ariaLabel: 'Добавить в избранное',
    },
    {
      cb(addFavorite) {
        addFavorite.dataset.id = id;
        addFavorite.addEventListener('click', handlerFavorite);
      },
    },
  );

  createElement(
    'div',
    {
      className: 'card__control',
    },
    {
      parrent: form,
      childs: [count, addCard, addFavorite],
    },
  );
};
