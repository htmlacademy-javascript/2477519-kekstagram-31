import { getCache } from './backend.js';

const STEP_OF_COMMENTS = 5;

const Avatar = {
  HEIGHT: 35,
  WIDTH: 35,
};

const bigPictureModule = document.querySelector('.big-picture');
const pictureImg = bigPictureModule.querySelector('.big-picture__img img');
const likesCount = bigPictureModule.querySelector('.likes-count');
const commentShownCount = bigPictureModule.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPictureModule.querySelector('.social__comment-total-count');
const commentsList = bigPictureModule.querySelector('.social__comments');
const socialCaption = bigPictureModule.querySelector('.social__caption');
const body = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const commentsLoader = bigPictureModule.querySelector('.comments-loader');

let commentCount = 0;
let comments = null;

const closeBigPictureModule = () => {
  bigPictureModule.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);

  commentsLoader.removeEventListener('click', onLoadNewComment);

  commentCount = 0;
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeBigPictureModule();
  }
}

function onLoadNewComment() {
  const newComments = comments.slice(commentCount, commentCount + STEP_OF_COMMENTS);

  createComments(newComments);

  if (Number(commentShownCount.textContent) === comments.length) {
    commentsLoader.classList.add('hidden');
  }
}

function createComments(note) {
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
}

const openBigPictureModule = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();

    const photo = getCache()[evt.target.closest('.picture').dataset.id];
    comments = photo.comments;
    body.classList.add('modal-open');
    bigPictureModule.classList.remove('hidden');
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

    commentsLoader.addEventListener('click', onLoadNewComment);

    document.addEventListener('keydown', onEscKeyDown);
  }
};

const pictureCancel = document.getElementById('picture-cancel');
pictureCancel.addEventListener('click', closeBigPictureModule);

pictures.addEventListener('click', openBigPictureModule);
