import './index.html';
import './index.scss';

import { router } from './modules/router';

import { mainPage } from './modules/pages/mainPage';
import { renderFooter } from './modules/render/renderFooter';
import { renderHeader } from './modules/render/renderHeader';
import { getData } from './modules/getData';

import { API_URL, DATA, main } from './modules/const';
import { createScssColors } from './modules/createScssColors';
import { createElement } from './modules/utils/createElement';
import { categoryPage } from './modules/pages/categoryPage';
import { searchPage } from './modules/pages/searchPage';
import { favoriteController } from './modules/controllers/favoriteController';

const init = async () => {
  try {
    DATA.navigation = await getData(`${API_URL}/api/categories`);
    DATA.colors = await getData(`${API_URL}/api/colors`);
    createScssColors(DATA.colors);

    router.on('*', () => {
      renderHeader();
      renderFooter();
    });

    router.on('/', () => {
      mainPage();
    });
    router.on('women', () => {
      mainPage('women');
    });
    router.on('men', () => {
      mainPage('men');
    });
    router.on('/:gender/:category', categoryPage);

    router.on('/favorite', favoriteController);

    router.on('search', searchPage);
  } catch (error) {
    console.warn(error);
    createElement(
      'h2',
      {
        textContent: 'Данные не загрузились, попробуйте позже...',
      },
      {
        parrent: main,
        cb(h2) {
          h2.style.textAlign = 'center';
        },
      },
    );
  } finally {
    router.resolve();
  }
};

init();
