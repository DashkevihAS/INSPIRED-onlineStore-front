import './index.html';
import './index.scss';

import { router } from './modules/router';

import { mainPage } from './modules/mainPage/mainPage';
import { menMainPage } from './modules/mainPage/menMainPage';
import { womenMainPage } from './modules/mainPage/womenMainPage';
import { renderFooter } from './modules/render/renderFooter';
import { renderHeader } from './modules/render/renderHeader';
import { getData } from './modules/getData';

import { API_URL, DATA } from './modules/const';
import { createScssColors } from './modules/createScssColors';
import { createElement } from './modules/createElement';

const init = async () => {
  try {
    router.on('*', () => {
      renderHeader();
      renderFooter();
    });

    DATA.navigation = await getData(`${API_URL}/api/categories`);
    DATA.colors = await getData(`${API_URL}/api/colors`);
    createScssColors(DATA.colors);

    router.on('/', () => {
      mainPage();
    });
    router.on('women', () => {
      womenMainPage();
    });
    router.on('men', () => {
      menMainPage();
    });

    router.on('search', (data) => {
      console.log('data: ', data.params.value);
    });

    // setTimeout(() => {
    //   router.navigate('men');
    // }, 3000);
    // setTimeout(() => {
    //   router.navigate('women');
    // }, 6000);
  } catch (error) {
    createElement(
      'h2',
      {
        textContent: 'Данные не загрузились, попробуйте позже...',
      },
      {
        parrent: document.querySelector('main'),
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
