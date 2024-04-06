import { createTemplateAll } from './template.js';
import { debounce } from './util.js';

const RENDER_PHOTOS_COUNT = 10;

const imgFiltersForm = document.querySelector('.img-filters__form');

let filteredData = [];
let currentFilter = 'filter-default';

const clearPictures = () => {
  document.querySelectorAll('.picture').forEach((item) => item.remove());
};

const applyFilter = (data) => {
  const filters = {
    'filter-default': data,
    'filter-random': data.toSorted(() => 0.5 - Math.random()).slice(0, RENDER_PHOTOS_COUNT),
    'filter-discussed': data.toSorted((a, b) => b.comments.length - a.comments.length),
  };

  clearPictures();
  filteredData = filters[currentFilter];
  createTemplateAll(filteredData);
};

const changeFilter = (data) => {
  imgFiltersForm.addEventListener('click', debounce((evt) => {
    const activeButton = document.querySelector('.img-filters__button--active');
    if (activeButton === evt.target) {
      return;
    }
    activeButton.classList.toggle('img-filters__button--active');
    evt.target.classList.toggle('img-filters__button--active');
    currentFilter = evt.target.id;

    applyFilter(data);
  }));
};

export { changeFilter };