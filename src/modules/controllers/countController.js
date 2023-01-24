import { renderCount } from '../render/renderCount';

export const countController = (minus, number, plus, input) => {
  let n = +input.value;

  minus.addEventListener('click', () => {
    if (n > 1) {
      n -= 1;
    }
    input.value = n;
    number.textContent = n;
  });
  plus.addEventListener('click', () => {
    n += 1;
    input.value = n;
    number.textContent = n;
  });
};
