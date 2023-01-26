import { order } from '../const';
import { createElement } from '../utils/createElement';
import {
  cartGoodsStore,
  clearCart,
  getCart,
} from '../controllers/cartController';
import { sendOrder } from '../controllers/orderController';
import { API_URL } from '../const';
import { calcTotalPrice } from '../controllers/cartController';
import { router } from '../router';

const showOrderInfo = (orderInfo) => {
  const modal = createElement(
    'div',
    {
      className: 'modal',
    },
    {
      parent: document.body,
      cb(modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.remove();
            router.navigate('/');
          }
        });
      },
    },
  );

  const modalBody = createElement(
    'div',
    {
      className: 'modal__body',
    },
    {
      parent: modal,
    },
  );

  modalBody.insertAdjacentHTML(
    'beforeend',
    `
    <h2 class="modal__title">Заказ оформлен №${orderInfo.id}</h2>
    <p class="modal__description modal__description_thank">
      Спасибо за выбор нашего магазина!
    </p>
    <p class="modal__description">
      Здесь вы можете посмотреть все детали вашего заказа.
    </p>

    <ul class="modal__customer-data customer">
      <li class="customer__item">
        <span class="customer__item-title">Получатель</span>
        <span class="customer__item-data">${orderInfo.fio}</span>
      </li>

${
  orderInfo.address &&
  `     
    <li class="customer__item">
      <span class="customer__item-title">Адрес доставки</span>
      <span class="customer__item-data">${orderInfo.address}</span>
    </li>`
}

      <li class="customer__item">
        <span class="customer__item-title">Телефон</span>
        <span class="customer__item-data">${orderInfo.phone}</span>
      </li>

${
  orderInfo.email &&
  `
    <li class="customer__item">
      <span class="customer__item-title">E-mail</span>
      <span class="customer__item-data">${orderInfo.email}</span>
    </li>
`
}
      
      <li class="customer__item">
        <span class="customer__item-title">Способ получения</span>
        <span class="customer__item-data">${
          orderInfo.delivery === 'delivery' ? 'Доставка' : 'Самовывоз'
        }</span>
      </li>
    </ul>
  `,
  );

  const goodsList = createElement(
    'ul',
    {
      className: 'modal__goods goods-list',
    },
    {
      parent: modalBody,
    },
  );

  orderInfo.order.forEach((item) => {
    const data = cartGoodsStore.getProduct(item.id);

    createElement(
      'li',
      {
        className: 'goods-list__item',
        innerHTML: `
          <img
            class="goods-list__img"
            src=${API_URL}/${data.pic}
            alt=${data.title}
          />
          <p class="goods-list__count">x${item.count}</p>
        `,
      },
      {
        parent: goodsList,
      },
    );
  });

  createElement(
    'div',
    {
      className: 'modal__total',
      innerHTML: '<p class="modal__total-title">Итого:</p>',
    },
    {
      parent: modalBody,
      child: createElement('p', {
        className: 'modal__total-price',
        textContent: `руб ${calcTotalPrice.totalPrice}`,
      }),
    },
  );

  createElement(
    'button',
    {
      className: 'modal__close',
      innerHTML: `
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 8L8 16"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M16 16L8 8"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    `,
    },
    {
      parent: modalBody,
      cb(btn) {
        btn.addEventListener('click', () => {
          modal.remove();
          router.navigate('/');
        });
      },
    },
  );
  clearCart();
};

export const renderOrder = ({ render }) => {
  order.textContent = '';

  if (!render) return;

  const container = createElement(
    'div',
    {
      className: 'container',
      innerHTML: '<h2 class="order__title">Оформление заказа</h2>',
    },
    {
      parent: order,
    },
  );

  const form = createElement(
    'form',
    {
      className: 'order__form',
    },
    {
      parent: container,
      cb(form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();

          const formData = new FormData(form);
          const data = Object.fromEntries(formData);
          data.order = getCart();

          if (data.order.length) {
            sendOrder(data)
              .then((orderInfo) => showOrderInfo(orderInfo))
              .catch((err) => console.warn(err));
          } else {
            createElement(
              'p',
              {
                className: 'order__message',
                textContent: 'В корзине нет товаров',
              },
              {
                parent: form,
                cb(el) {
                  setTimeout(() => {
                    el.remove();
                  }, 2000);
                },
              },
            );
          }
        });
      },
    },
  );

  form.insertAdjacentHTML(
    'beforeend',
    `
    <fieldset class="order__personal">
    <label class="order__label">
      <input
        class="order__input"
        type="text"
        placeholder="ФИО"
        name="fio"
        required
      />
    </label>

    <label class="order__label">
      <input
        class="order__input"
        type="text"
        placeholder="Адрес доставки"
        name="address"
      />
    </label>

    <label class="order__label">
      <input
        class="order__input"
        type="text"
        placeholder="Телефон"
        name="phone"
        required
      />
    </label>

    <label class="order__label">
      <input
        class="order__input"
        type="text"
        placeholder="E-mail"
        name="email"
      />
    </label>
  </fieldset>

  <fieldset class="order__radio-list">
    <label class="order__radio radio">
      <input
        class="radio__input"
        type="radio"
        name="delivery"
        value="delivery"
        required
      />
      <span class="radio__text">Доставка</span>
    </label>

    <label class="order__radio radio">
      <input
        class="radio__input"
        type="radio"
        name="delivery"
        value="self"
        required
      />
      <span class="radio__text">Самовывоз</span>
    </label>
  </fieldset>

  <button class="order__submit main-button" type="submit">
    Оформить
  </button>
  `,
  );
};
