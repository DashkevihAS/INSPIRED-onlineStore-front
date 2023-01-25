import { cart } from '../const';
import { getData } from '../getData';
import { renderCard } from '../render/renderCard';
import { renderCart } from '../render/renderCart';
import { renderGoods } from '../render/renderGoods';
import { renderHero } from '../render/renderHero';
import { renderNavigation } from '../render/renderNavigation';
import { renderOrder } from '../render/renderOrder';
import { API_URL } from '../const';

export const cartGoodsStore = {
  goods: [],
  _add(product) {
    if (!this.goods.some((item) => item.id === product.id)) {
      this.goods.push(product);
    }
  },
  add(goods) {
    if (Array.isArray(goods)) {
      goods.forEach((product) => {
        this._add(product);
      });
    } else {
      this._add(goods);
    }
  },
  getProduct(id) {
    return this.goods.find((item) => item.id === id);
  },
};

export const calcTotalPrice = {
  elemTotalPRice: null,
  elemCount: null,
  update() {
    const cartList = getCart();
    this.count = cartList.length;
    this.totalPrice = cartList.reduce((sum, item) => {
      const product = cartGoodsStore.getProduct(item.id);
      return product.price * item.count + sum;
    }, 0);
    this.writeTotal();
    this.writeCount();
  },
  updateCount() {
    const cartList = getCart();
    this.count = cartList.length;
    this.writeCount();
  },
  writeTotal(elem = this.elemTotalPRice) {
    if (elem) {
      this.elemTotalPRice = elem;
      elem.textContent = `руб ${this.totalPrice}`;
    }
  },
  writeCount(elem = this.elemCount) {
    if (elem) {
      this.elemCount = elem;
      elem.textContent = this.count;
    }
  },
};

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
    calcTotalPrice.update();
  }
};

cart.addEventListener('click', handlerCart);

export const cartController = async () => {
  const idList = getCart().map((item) => item.id);
  const data = await getData(`${API_URL}/api/goods?list=${idList}&count=all`);

  cartGoodsStore.add(data);

  renderNavigation({ render: false });
  renderHero({ render: false });
  renderCard({ render: false });
  renderGoods({ render: false });
  renderCart({ render: true });
  renderOrder({ render: true });
};
