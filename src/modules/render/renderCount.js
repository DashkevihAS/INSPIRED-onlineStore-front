import { countController } from '../controllers/countController';
import { createElement } from '../utils/createElement';

export const renderCount = (count, className, returnCount = () => {}) => {
  const control = createElement('div', {
    className: `${className} count`,
  });

  const minus = createElement(
    'button',
    {
      className: 'count__item count__minus',
      textContent: '-',
      type: 'button',
    },
    {
      parent: control,
    },
  );

  const number = createElement(
    'span',
    {
      className: 'count__item count__number',
      textContent: count,
    },
    {
      parent: control,
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
      parent: control,
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
      parent: control,
    },
  );

  countController(minus, number, plus, input, returnCount);

  return control;
};
