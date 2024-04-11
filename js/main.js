import { getData, updateCache} from './backend.js';
import { createTemplateAll } from './template.js';
import { changeFilter } from './filters.js';
import './upload-form.js';
import './big-picture.js';
import './save-file.js';

const SHOW_MESSAGE_TIME = 5000;

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const imgFilters = document.querySelector('.img-filters');

getData()
  .then((photos) => {
    createTemplateAll(photos);
    updateCache(photos);
    imgFilters.classList.remove('img-filters--inactive');
    changeFilter(photos);
  }).catch(() => {
    imgFilters.classList.add('img-filters--inactive');
    document.body.append(dataError);
    setTimeout(() => dataError.remove(), SHOW_MESSAGE_TIME);
  });
