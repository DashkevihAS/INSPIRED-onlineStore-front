import { renderNavigation } from '../render/renderNavigation';
import { renderHero } from '../render/renderHero';
import { renderGoods } from '../render/renderGoods';
import { renderCard } from '../render/renderCard';

export const mainPage = (gender = 'women') => {
  renderNavigation(gender);
  renderHero(gender);
  renderCard(false);
  renderGoods('Новинки', {
    gender,
  });
};
