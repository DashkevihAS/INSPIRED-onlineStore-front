import { renderCard } from '../render/renderCard';
import { renderCart } from '../render/renderCart';
import { renderGoods } from '../render/renderGoods';
import { renderHero } from '../render/renderHero';
import { renderNavigation } from '../render/renderNavigation';
import { renderOrder } from '../render/renderOrder';

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
  renderCart({ render: false });
  renderOrder({ render: false });
  renderGoods({ title, params, render: true });
};
