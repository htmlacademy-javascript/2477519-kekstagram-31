import { getCache } from './backend.js';
import { isEscapeKey } from './util.js';

const STEP_OF_COMMENTS = 5;

const Avatar = {
  HEIGHT: 35,
  WIDTH: 35,
};

const body = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const pictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const pictureCancel = document.getElementById('picture-cancel');

let commentCount = 0;
let comments = null;

const createComments = (note) => {
  note.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentAvatar.width = Avatar.HEIGHT;
    commentAvatar.height = Avatar.WIDTH;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;

    commentItem.appendChild(commentAvatar);
    commentItem.appendChild(commentText);

    commentsList.appendChild(commentItem);
  });
  commentCount += note.length;
  commentShownCount.textContent = commentCount;
};

const onLoadNewComment = () => {
  const newComments = comments.slice(commentCount, commentCount + STEP_OF_COMMENTS);

  createComments(newComments);

  if (Number(commentShownCount.textContent) === comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  commentCount = 0;
};

function onEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

const openBigPicture = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();

    const photo = getCache()[evt.target.closest('.picture').dataset.id];
    comments = photo.comments;
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    pictureImg.src = photo.url;
    pictureImg.alt = photo.description;
    likesCount.textContent = photo.likes;
    commentShownCount.textContent = photo.comments.length;
    commentTotalCount.textContent = photo.comments.length;
    socialCaption.textContent = photo.description;

    commentsList.innerHTML = '';

    createComments(comments.slice(0, STEP_OF_COMMENTS));
    if (Number(commentShownCount.textContent) === comments.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
    document.addEventListener('keydown', onEscKeyDown);
  }
};

commentsLoader.addEventListener('click', onLoadNewComment);

pictureCancel.addEventListener('click', closeBigPicture);
pictures.addEventListener('click', openBigPicture);
