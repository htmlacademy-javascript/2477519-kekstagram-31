const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const slider = imgUploadWrapper.querySelector('.effect-level__slider');
const effectLevel = imgUploadWrapper.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadWrapper.querySelector('.effect-level__value');
const img = imgUploadWrapper.querySelector('.img-upload__preview img');

noUiSlider.create(slider, {
  start: 0,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1,
  },
  format: {
    to: (value) => Number.isInteger(value)
      ? value.toFixed(0)
      : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});


effectLevel.classList.add('hidden');

const EFFECTS_CSS = {
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'grayscale(%val%)' 
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'sepia(%val%)'
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    filter: 'invert(%val%%)'
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'blur(%val%px)'
  },
  'heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'brightness(%val%)'
  }
}

const applyEffect = (effect) => {
  if (effect === 'none') {
    effectLevel.classList.add('hidden');
    img.style.filter = '';
    return;
  }
  effectLevel.classList.remove('hidden');
  const {filter, ...opt} = EFFECTS_CSS[effect]
  slider.noUiSlider.updateOptions(opt);
  slider.noUiSlider.on('update', () => {
    effectLevelValue.value = slider.noUiSlider.get();
    img.style.filter = filter.replace('%val%', effectLevelValue.value);
  });
};

const onEffectChange = (evt) => {
  const effect = evt.target.value;
  applyEffect(effect);
};

export { onEffectChange };
