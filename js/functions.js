// Функция для проверки длины строки
function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}
// Примеры использования функции:
checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false

//Функция для проверки, является ли строка палиндромом.
function isPalindrome(str) {
  // Удаляем пробелы из строки
  let stringWithoutSpaces = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      stringWithoutSpaces += str[i];
    }
  }

  // Приводим строку без пробелов к нижнему регистру
  stringWithoutSpaces = stringWithoutSpaces.toLowerCase();

  // Сравниваем строку без пробелов с ее обратной версией
  for (let i = 0; i < stringWithoutSpaces.length / 2; i++) {
    if (stringWithoutSpaces[i] !== stringWithoutSpaces[stringWithoutSpaces.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

// Примеры использования функции:
isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true
