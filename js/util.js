// Функция для генерации случайного числа в диапазоне от min до max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция отслеживания нажатия кнопки Esc
const isEscKeyDown = (evt) => evt.key === 'Escape';

export { getRandomNumber, isEscKeyDown };
