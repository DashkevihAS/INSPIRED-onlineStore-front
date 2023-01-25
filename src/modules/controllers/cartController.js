import { renderCard } from '../render/renderCard';
import { renderCart } from '../render/renderCart';
import { renderGoods } from '../render/renderGoods';
import { renderHero } from '../render/renderHero';
import { renderNavigation } from '../render/renderNavigation';
import { renderOrder } from '../render/renderOrder';

export const addProductCart = (product) => {
  console.log(product);
};

export const cartController = () => {
  renderNavigation({ render: false });
  renderHero({ render: false });
  renderCard({ render: false });
  renderGoods({ render: false });
  renderCart({ render: true });
  renderOrder({ render: true });
};
