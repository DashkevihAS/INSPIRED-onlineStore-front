import { router } from '../router';

import { renderNavigation } from '../render/renderNavigation';
import { renderHero } from '../render/renderHero';
import { renderGoods } from '../render/renderGoods';
import { goodsElem } from '../const';

export const getFavorite = () =>
  JSON.parse(localStorage.getItem('favorite') || '[]');

const addFavorite = (id) => {
  const favoriteList = getFavorite();
  favoriteList.push(id);
  localStorage.setItem('favorite', JSON.stringify(favoriteList));
};

const removeFavorite = (id) => {
  const favoriteList = getFavorite();
  const filteredFavoriteList = favoriteList.filter((item) => item !== id);

  localStorage.setItem('favorite', JSON.stringify(filteredFavoriteList));
};

goodsElem.addEventListener('click', (e) => {
  const target = e.target;

  if (target.closest('.favorite_active')) {
    removeFavorite(target.dataset.id);
    target.classList.remove('favorite_active');
    return;
  }

  if (target.closest('.favorite')) {
    addFavorite(target.dataset.id);
    target.classList.add('favorite_active');
  }
});

export const favoriteController = () => {
  renderNavigation('women');
  renderHero(false);
  renderGoods('Избранное', {
    list: getFavorite(),
  });
};
