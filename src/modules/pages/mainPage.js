import { renderNavigation } from '../render/renderNavigation';
import { renderHero } from '../render/renderHero';
import { renderGoods } from '../render/renderGoods';
import { renderCard } from '../render/renderCard';
import { renderCart } from '../render/renderCart';
import { renderOrder } from '../render/renderOrder';

export const mainPage = (gender = 'women') => {
  renderNavigation({ gender, render: true });
  renderHero({ gender, render: true });
  renderCard({ render: false });
  renderCart({ render: false });
  renderOrder({ render: false });
  renderGoods({
    title: 'Новинки',
    params: {
      gender,
    },
    render: true,
  });
};
