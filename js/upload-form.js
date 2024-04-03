import { onEffectChange } from './picture-effects.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUpload = document.querySelector('.img-upload');
const inputHashtag = imgUpload.querySelector('.text__hashtags');
const imgDescription = imgUpload.querySelector('.text__description');
const uploadFile = imgUpload.querySelector('#upload-file');
const uploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

const smaller = imgUploadForm.querySelector('.scale__control--smaller');
const bigger = imgUploadForm.querySelector('.scale__control--bigger');
const img = imgUploadForm.querySelector('.img-upload__preview');
const scaleControl = imgUploadForm.querySelector('.scale__control--value');
const effectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectsList = imgUploadForm.querySelector('.effects__list');

let scale = 1;


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__field-wrapper--error',
});


const isHashtagsValid = (hashTags) => hashTags.match(/^(#[\w\d]{1,20}\s*){0,5}$/i);

const isHashtagsUnique = (hashTags) => {
  const tags = hashTags.toLowerCase().split(' ').filter((tag) => tag.trim() !== '');
  const uniq = new Set(tags);
  return tags.length === uniq.size;
};

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

const isDesriptionTooLong = (description) => description.length <= 140;

pristine.addValidator(imgDescription,
  isDesriptionTooLong,
  'Комментарий слишком большой',
  2,
  false
);

const onImgUploadClose = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  scale = 1;
  img.style.transform = `scale(${scale})`;
  effectLevel.classList.add('hidden');
  img.style.filter = 'none';
  imgUploadForm.reset();
  document.removeEventListener('keydown', onEscapeKeydown);
};

function onEscapeKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onImgUploadClose();
  }
}

const onSelectPhoto = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  imgUploadCancel.addEventListener('click', onImgUploadClose);
  document.addEventListener('keydown', onEscapeKeydown);
};

inputHashtag.addEventListener('keydown', (evt) => evt.stopPropagation());

imgDescription.addEventListener('keydown', (evt) => evt.stopPropagation());

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

const onHashtagInput = () => {
  isHashtagsValid(inputHashtag.value);
};

const onSubmitForm = (evt) => {
  evt.preventDefault();

  pristine.validate();
};

smaller.addEventListener('click', onSmallerClick);

bigger.addEventListener('click', onBiggerClick);

effectsList.addEventListener('change', onEffectChange);

inputHashtag.addEventListener('input', onHashtagInput);

uploadFile.addEventListener('change', onSelectPhoto);

imgUploadForm.addEventListener('submit', onSubmitForm);
