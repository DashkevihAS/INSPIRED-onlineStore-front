import { createElement } from '../createElement';

export const renderHero = (gender) => {
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
    href: `#/${gender}/bathrobes`,
  });
  const heroTitle = createElement('h2', {
    className: 'hero__title',
    textContent: 'Новая коллекция Бюстгальтер-балконет',
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
