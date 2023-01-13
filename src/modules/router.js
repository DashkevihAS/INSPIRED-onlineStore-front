import Navigo from 'navigo';

// hash: true чтобы навигация была по адресной строке после #,
// а не по дата-атрибутам у кнопок
export const router = new Navigo('/', { hash: true });
