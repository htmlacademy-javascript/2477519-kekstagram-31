const isEnterKey = (evt) => evt.key === 'Enter';

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function shuffle(array) {
  const copy = array.slice();
  let currentIndex = copy.length;

  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]];
  }
  return copy;
}

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {isEscapeKey, isEnterKey, throttle, debounce, shuffle };
