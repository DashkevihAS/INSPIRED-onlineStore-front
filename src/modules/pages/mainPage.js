import { renderNavigation } from '../render/renderNavigation';
import { renderHero } from '../render/renderHero';
import { renderGoods } from '../render/renderGoods';
import { renderCard } from '../render/renderCard';

export const mainPage = (gender = 'women') => {
  renderNavigation({ gender, render: true });
  renderHero({ gender, render: true });
  renderCard({ render: false });
  renderGoods({
    title: 'Новинки',
    params: {
      gender,
    },
    render: true,
  });
};
