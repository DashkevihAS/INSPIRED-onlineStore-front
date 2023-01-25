export const createElement = (
  tag,
  attr,
  { child, childs, parent, cb } = {},
) => {
  const element = document.createElement(tag);
  if (attr) {
    Object.assign(element, attr);
  }

  if (child && child instanceof HTMLElement) {
    element.append(child);
  }

  if (childs && childs.every((item) => item instanceof HTMLElement)) {
    element.append(...childs);
  }

  if (parent && parent instanceof HTMLElement) {
    parent.append(element);
  }

  if (cb && typeof cb === 'function') {
    cb(element);
  }

  return element;
};
