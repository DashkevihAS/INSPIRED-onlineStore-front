import { renderGoods } from '../render/renderGoods';
import { renderHero } from '../render/renderHero';
import { renderNavigation } from '../render/renderNavigation';

export const searchPage = (data) => {
  console.log('data: ', data);
  const searchValue = data.params.value;
  const params = { search: searchValue };
  if (data.params?.page) {
    params.page = data.params.page;
  }

  const title = searchValue;

  renderNavigation('men', 'socks');
  renderHero(false);
  renderGoods(title, params);
};
