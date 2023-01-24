import { countController } from '../controllers/countController';
import { createElement } from '../utils/createElement';

export const renderCount = (count) => {
  const control = createElement('div', {
    className: 'card__count count',
  });

  const minus = createElement(
    'button',
    {
      className: 'count__item count__minus',
      textContent: '-',
      type: 'button',
    },
    {
      parrent: control,
    },
  );

  const number = createElement(
    'span',
    {
      className: 'count__item count__number',
      textContent: count,
    },
    {
      parrent: control,
    },
  );

  const plus = createElement(
    'button',
    {
      className: 'count__item count__plus',
      type: 'button',
      textContent: '+',
    },
    {
      parrent: control,
    },
  );

  const input = createElement(
    'input',
    {
      type: 'hidden',
      name: 'count',
      value: count,
    },
    {
      parrent: control,
    },
  );

  countController(minus, number, plus, input);

  return control;
};
