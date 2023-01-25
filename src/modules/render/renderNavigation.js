import { DATA, navigation } from '../const';
import { createElement } from '../utils/createElement';

// flag не  даст перерендериться если renderNavigation уже запускался
let flag = false;

// prevGender запустит  renderNavigation  если сменили gender
let prevGender = '';
let prevCategory = '';

export const renderNavigation = ({ gender, category, render }) => {
  if (!render) {
    navigation.style.display = 'none';
    return;
  }
  navigation.style.display = '';

  if (flag && prevGender === gender && prevCategory === category) return;

  prevGender = gender;
  prevCategory = category;
  flag = true;

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

  for (const genderName in DATA.navigation) {
    createElement(
      'a',
      {
        className: `gender__link ${
          gender === genderName ? 'gender__link_active' : ''
        }`,
        href: `#/${genderName}`,
        textContent: DATA.navigation[genderName].title,
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

  const categoryElems = DATA.navigation[gender].list.map((item) =>
    createElement(
      'li',
      {
        className: 'category__item',
      },
      {
        child: createElement(
          'a',
          {
            className: `category__link ${
              category === item.slug ? 'category__link_active' : ''
            }`,
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
