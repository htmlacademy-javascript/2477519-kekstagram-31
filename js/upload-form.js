import { onEffectChange } from './picture-effects.js';
import { sendData } from './backend.js';
import { showModal } from './modal.js';
import { isEscapeKey } from './util.js';

const MAX_SIZE = 5;
const MAX_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUpload = document.querySelector('.img-upload');
const inputHashtag = imgUpload.querySelector('.text__hashtags');
const imgDescription = imgUpload.querySelector('.text__description');
const uploadFile = imgUpload.querySelector('#upload-file');
const uploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

const smaller = imgUploadForm.querySelector('.scale__control--smaller');
const bigger = imgUploadForm.querySelector('.scale__control--bigger');
const img = imgUploadForm.querySelector('.img-upload__preview img');
const scaleControl = imgUploadForm.querySelector('.scale__control--value');
const effectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectsList = imgUploadForm.querySelector('.effects__list');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const errorPopup = document.querySelector('#error').content.querySelector('.error');
const successPopup = document.querySelector('#success').content.querySelector('.success');

let scale = 1;

let pristine = null;

const setupValidators = () => {
  pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  const isHashtagsValid = (hashTags) => {
    if (!hashTags.trim()) {
      return true;
    }
    if (!hashTags.match(/^(#[а-я\w\d]{1,19}\s*){0,5}$/i)) {
      return false;
    }
    return true;
  };

  const isHashtagsUnique = (hashTags) => {
    const tags = hashTags.toLowerCase().split(' ').filter((tag) => tag.trim() !== '');
    const uniq = new Set(tags);
    return tags.length === uniq.size && uniq.size <= MAX_SIZE;
  };

  const isDesriptionTooLong = (description) => description.length <= MAX_LENGTH;

  pristine.addValidator(inputHashtag,
    isHashtagsValid,
    'Хештеги должны начинаться с символа "#", содержать буквы и цифры, быть не длинее 20 символов и их не должно быть больше пяти',
    2,
    false
  );

  pristine.addValidator(inputHashtag,
    isHashtagsUnique,
    'Хештеги не могут повторяться',
    2,
    false
  );

  pristine.addValidator(imgDescription,
    isDesriptionTooLong,
    'Комментарий слишком большой',
    2,
    false
  );
};

const setupScale = () => {
  const SCALE_STEP = 0.25;

  const onSmallerClick = () => {
    if (scale > SCALE_STEP) {
      img.style.transform = `scale(${scale -= SCALE_STEP})`;
      scaleControl.value = `${scale * 100}%`;
    }
  };

  const onBiggerClick = () => {
    if (scale < 1) {
      img.style.transform = `scale(${scale += SCALE_STEP})`;
      scaleControl.value = `${scale * 100}%`;
    }
  };

  bigger.addEventListener('click', onBiggerClick);

  smaller.addEventListener('click', onSmallerClick);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Отправить';
};

const onImgUploadClose = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  pristine.reset();
  scale = 1;
  img.style.transform = `scale(${scale})`;
  effectLevel.classList.add('hidden');
  img.style.filter = 'none';
  imgUploadForm.reset();
  document.removeEventListener('keydown', onEscapeKeydown);
};

function onEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onImgUploadClose();
  }
}

const onSelectPhoto = () => {
  document.body.classList.add('modal-open');
  setupValidators();
  uploadOverlay.classList.remove('hidden');
  imgUploadCancel.addEventListener('click', onImgUploadClose);
  document.addEventListener('keydown', onEscapeKeydown);
};

inputHashtag.addEventListener('keydown', (evt) => evt.stopPropagation());

imgDescription.addEventListener('keydown', (evt) => evt.stopPropagation());

const onSubmitForm = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(onSuccess)
        .then(() => {
          showModal(successPopup, 'success');
        })
        .catch(() => showModal(errorPopup, 'error'))
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};

setupScale();

imgUploadCancel.addEventListener('click', onImgUploadClose);

effectsList.addEventListener('change', onEffectChange);

uploadFile.addEventListener('change', onSelectPhoto);

export { onSubmitForm, onImgUploadClose };
