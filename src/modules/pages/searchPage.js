import { renderGoods } from '../render/renderGoods';
import { renderHero } from '../render/renderHero';
import { renderNavigation } from '../render/renderNavigation';

export const searchPage = (routerData) => {
  const searchValue = routerData.params.value;

  const params = { search: searchValue };

  if (routerData.params?.page) {
    params.page = routerData.params.page;
  }

  const title = searchValue;

  renderNavigation('men');
  renderHero(false);
  renderGoods(title, params);
};
