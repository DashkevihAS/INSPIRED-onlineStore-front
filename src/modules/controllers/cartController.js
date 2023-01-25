import { cart } from '../const';
import { renderCard } from '../render/renderCard';
import { renderCart } from '../render/renderCart';
import { renderGoods } from '../render/renderGoods';
import { renderHero } from '../render/renderHero';
import { renderNavigation } from '../render/renderNavigation';
import { renderOrder } from '../render/renderOrder';

export const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

export const removeProductCart = ({ id, color, size }) => {
  const cartList = getCart();
  console.log('cartList1: ', cartList);
  const index = cartList.findIndex(
    (item) => item.id === id && item.color === color && item.size === size,
  );

  cartList.splice(index, 1);
  console.log('cartList2: ', cartList);

  localStorage.setItem('cart', JSON.stringify(cartList));
};

export const addProductCart = (product, equal) => {
  let isCart = false;

  const productList = getCart().map((item) => {
    if (
      item.id === product.id &&
      item.color === product.color &&
      item.size === product.size
    ) {
      if (equal) {
        item.count = product.count;
      } else {
        item.count = +item.count + +product.count;
      }
      isCart = true;
    }

    return item;
  });

  if (!isCart) {
    productList.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(productList));
};

export const handlerCart = (e) => {
  const target = e.target;

  if (target.closest('.item__del')) {
    removeProductCart(target.dataset);
    target.closest('.cart__item').remove();
  }
};

cart.addEventListener('click', handlerCart);

export const cartController = () => {
  renderNavigation({ render: false });
  renderHero({ render: false });
  renderCard({ render: false });
  renderGoods({ render: false });
  renderCart({ render: true });
  renderOrder({ render: true });
};
