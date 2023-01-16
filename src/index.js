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

const init = async () => {
  DATA.navigation = await getData(`${API_URL}/api/categories`);
  DATA.colors = await getData(`${API_URL}/api/colors`);
  console.log('DATA.colors: ', DATA.colors);
  createScssColors(DATA.colors);

  router.on('*', () => {
    renderHeader();
    renderFooter();
  });

  router.on('/', () => {
    mainPage();
  });
  router.on('women', () => {
    womenMainPage();
  });
  router.on('men', () => {
    menMainPage();
  });

  // setTimeout(() => {
  //   router.navigate('men');
  // }, 3000);
  // setTimeout(() => {
  //   router.navigate('women');
  // }, 6000);

  router.resolve();
};

init();
