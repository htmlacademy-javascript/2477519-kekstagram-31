import { getCache } from './backend.js';

const bigPictureModule = document.querySelector('.big-picture');
const pictureImg = bigPictureModule.querySelector('.big-picture__img img');
const likesCnt = bigPictureModule.querySelector('.likes-count');
const commentShownCnt = bigPictureModule.querySelector('.social__comment-shown-count');
const commentTotalCnt = bigPictureModule.querySelector('.social__comment-total-count');
const commentsList = bigPictureModule.querySelector('.social__comments');
const socialCaption = bigPictureModule.querySelector('.social__caption');
const body = document.querySelector('body');
const pictures = document.querySelector('.pictures');
const Avatar = {
  HEIGHT: 35,
  WIDTH: 35,
};

let constsComment = 0;
let comments = null;

const closeBigPictureModule = () => {
  bigPictureModule.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);

  const commentsLoader = bigPictureModule.querySelector('.comments-loader');
  commentsLoader.removeEventListener('click', onLoadNewComment);

  constsComment = 0;
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeBigPictureModule();
  }
}

function onLoadNewComment() {
  const newComments = comments.slice(constsComment, constsComment + 5);
  createComments(newComments);
}

function createComments(cmts) {
  cmts.forEach((comment) => {
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
  constsComment += cmts.length;
  commentShownCnt.textContent = constsComment;
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
    likesCnt.textContent = photo.likes;
    commentShownCnt.textContent = photo.comments.length;
    commentTotalCnt.textContent = photo.comments.length;
    socialCaption.textContent = photo.description;

    commentsList.innerHTML = '';

    createComments(comments.slice(0, 5));

    const commentsLoader = bigPictureModule.querySelector('.comments-loader');
    commentsLoader.addEventListener('click', onLoadNewComment);

    document.addEventListener('keydown', onEscKeyDown);
  }
};

const pictureCancel = document.getElementById('picture-cancel');
pictureCancel.addEventListener('click', closeBigPictureModule);

pictures.addEventListener('click', openBigPictureModule);
