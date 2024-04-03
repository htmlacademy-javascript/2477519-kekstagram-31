const imgUploadForm = document.querySelector('.img-upload__form');
const imgUpload = document.querySelector('.img-upload');
const inputHashtag = imgUpload.querySelector('.text__hashtags');
const imgDescription = imgUpload.querySelector('.text__description');
const uploadFile = imgUpload.querySelector('#upload-file');
const uploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__field-wrapper--error',
});


const isHashtagsValid = (hashTags) => {
  return hashTags.match(/^(#[\w\d]{1,20}\s*){0,5}$/i)
};

const isHashtagsUnique = (hashTags) => {
  const tags = hashTags.toLowerCase().split(' ').filter(tag => tag.trim() !== '')
  let uniq = new Set(tags)
  return tags.length == uniq.size
};

pristine.addValidator(inputHashtag,
  isHashtagsValid,
  'Хештеги должны начинаться с символа \"#\", содержать буквы и цифры, быть не длинее 20 символов и их не должно быть больше пяти',
  2,
  false
);

pristine.addValidator(inputHashtag,
  isHashtagsUnique,
  'Хештеги не могут повторяться',
  2,
  false
);

const isDesriptionTooLong = (description) => {
  return description.length <= 140
};

pristine.addValidator(imgDescription,
  isDesriptionTooLong,
  'Комментарий слишком большой',
  2,
  false
);

const onImgUploadClose = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
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

const onSubmitForm = (evt) => {
  evt.preventDefault();

  pristine.validate();
};

uploadFile.addEventListener('change', onSelectPhoto);

imgUploadForm.addEventListener('submit', onSubmitForm);