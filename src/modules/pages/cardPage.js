import { DATA } from '../const';
import { getData } from '../getData';
import { renderGoods } from '../render/renderGoods';
import { renderHero } from '../render/renderHero';
import { renderNavigation } from '../render/renderNavigation';
import { API_URL } from '../const';
import { renderCard } from '../render/renderCard';

export const cardPage = async (routerData) => {
  const { id } = routerData.data;

  const data = await getData(`${API_URL}/api/goods/${id}`);
  const { gender, category } = data;

  const search = data.title?.split(' ')[0].toLowerCase();
  const params = { search, gender, count: 4 };

  renderNavigation({
    gender,
    category,
    render: true,
  });
  renderHero({ render: false });
  renderCard({ data, render: true });
  renderGoods({ title: 'Вам также может понравиться', params, render: true });
};
