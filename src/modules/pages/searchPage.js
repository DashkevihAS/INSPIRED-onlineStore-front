import { renderCard } from '../render/renderCard';
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

  renderNavigation({ gender: 'men', render: true });
  renderHero({ render: false });
  renderCard({ render: false });
  renderGoods({ title, params, render: true });
};
