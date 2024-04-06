import { getData, updateCache } from './backend.js';
import { createTemplateAll } from './template.js';
import { onSubmitForm, onImgUploadClose } from './upload-form.js';
import './upload-form.js';
import './bigPicrure.js';

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');

getData()
  .then((photos) => {
    createTemplateAll(photos);
    updateCache(photos);
  }).catch(() => {
    document.body.append(dataError);
    setTimeout(() => document.body.removeChild(dataError), 5000);
  });

onSubmitForm(onImgUploadClose);
