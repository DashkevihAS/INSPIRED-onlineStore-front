import { createElement } from '../createElement';
import { TITLE } from '../const';

export const renderHero = (gender) => {
  console.log('gender: ', gender);
  const hero = document.querySelector('.hero');

  if (!gender) {
    hero.style.display = 'none';
    return;
  }

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
