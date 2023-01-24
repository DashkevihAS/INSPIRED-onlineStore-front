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

  const search = data.title?.split(' ')[0].toLowerCase();
  const params = { search, gender: data.gender, count: 4 };

  renderNavigation(data.gender, data.category);
  renderHero(false);
  renderCard(data);
  renderGoods('Вам также может понравиться', params);
};
