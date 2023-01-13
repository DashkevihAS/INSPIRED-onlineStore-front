import { createElement } from '../createElement';
import { dataNavigation } from '../dataNavigation';

export const renderNavigation = (gender) => {
  const navigation = document.querySelector('.navigation');
  navigation.textContent = '';

  const container = createElement(
    'div',
    {
      className: 'container',
    },
    {
      parrent: navigation,
    },
  );

  const genderList = createElement(
    'ul',
    {
      className: 'navigation__gender gender',
    },
    {
      parrent: container,
    },
  );

  for (const genderName in dataNavigation) {
    createElement(
      'a',
      {
        className: `gender__link ${
          gender === genderName ? 'gender__link_active' : ''
        }`,
        href: `#/${genderName}`,
        textContent: dataNavigation[genderName].title,
      },
      {
        parrent: createElement(
          'li',
          {
            className: 'gender__item',
          },
          {
            parrent: genderList,
          },
        ),
      },
    );
  }

  const categoryElems = dataNavigation[gender].list.map((item) =>
    createElement(
      'li',
      {
        className: 'category__item',
      },
      {
        child: createElement(
          'a',
          {
            className: 'category__link ',
            textContent: item.title,
            href: `#/${gender}/${item.slug}`,
          },
          {
            cb(elem) {
              elem.addEventListener('click', () => {
                document
                  .querySelector('.category__link_active')
                  ?.classList.remove('category__link_active');

                elem.classList.add('category__link_active');
              });
            },
          },
        ),
      },
    ),
  );

  createElement(
    'ul',
    {
      className: 'navigation__category category',
    },
    {
      parrent: container,
      childs: categoryElems,
    },
  );
};
