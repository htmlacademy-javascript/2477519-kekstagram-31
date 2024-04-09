const API_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

let serverCache = null;

const updateCache = (data) => {
  serverCache = data;
};

const getCache = () => serverCache;

const REQUEST_ERROR = 'Не получилось получить данные!';

const getData = () =>
  fetch(`${API_URL}/data`, { method: 'GET' })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });

const sendData = (body) =>
  fetch(`${API_URL}/`, { method: 'POST', body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(REQUEST_ERROR);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(error);
    });

export { getData, sendData, updateCache, getCache };
