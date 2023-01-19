import { createElement } from '../utils/createElement';
import { hero, TITLE } from '../const';

export const renderHero = (gender) => {
  if (!gender) {
    hero.style.display = 'none';
    return;
  }
  hero.style.display = '';

  hero.className = `hero hero_${gender}`;
  hero.textContent = '';

  const heroLink = createElement('a', {
    className: 'hero__link',
    textContent: 'Перейти',
    href: `#/product/${TITLE[gender].id}`,
  });

  const heroTitle = createElement('h2', {
    className: 'hero__title',
    textContent: TITLE[gender].title,
  });

  createElement(
    'div',
    {
      className: 'container',
    },
    {
      parrent: hero,
      child: createElement(
        'div',
        {
          className: 'hero__content',
        },
        {
          childs: [heroTitle, heroLink],
        },
      ),
    },
  );
};
