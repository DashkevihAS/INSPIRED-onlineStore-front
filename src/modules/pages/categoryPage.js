import { DATA } from '../const';
import { renderCard } from '../render/renderCard';
import { renderGoods } from '../render/renderGoods';
import { renderHero } from '../render/renderHero';
import { renderNavigation } from '../render/renderNavigation';

export const categoryPage = (routerData) => {
  const { gender, category } = routerData.data;

  if (!(gender in DATA.navigation)) return;

  const params = { gender, category };

  if (routerData.params?.page) {
    params.page = routerData.params.page;
  }

  const { title } = DATA.navigation[gender].list.find(
    (item) => item.slug === category,
  );

  renderNavigation({ gender, category, render: true });
  renderHero({ render: false });
  renderCard({ render: false });
  renderGoods({ title, params, render: true });
};
