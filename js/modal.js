import { isEscapeKey } from './util.js';

const body = document.body;

const showModal = (element, prefix) => {
  body.append(element);

  const onModalEscape = (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      evt.preventDefault();
      removeModal();
    }
  };

  const onCloseClick = (evt) => {
    if (evt.target.matches(`.${prefix}__button`) || !evt.target.closest(`.${prefix}__inner`)) {
      removeModal();
    }
  };

  function removeModal() {
    element.remove();
    body.removeEventListener('keydown', onModalEscape);
  }

  element.addEventListener('click', onCloseClick);

  body.addEventListener('keydown', onModalEscape);
};

export { showModal };
