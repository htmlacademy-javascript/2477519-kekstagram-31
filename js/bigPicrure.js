import { photos } from './data.js';

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

const closeBigPictureModule = () => {
  bigPictureModule.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown(evt){
  if (evt.key === 'Escape') {
    closeBigPictureModule();
  }
}

const openBigPictureModule = (evt) => {


  if (evt.target.closest('.picture')) {
    evt.preventDefault();

    const photo = photos[evt.target.closest('.picture').dataset.id];
    body.classList.add('modal-open');
    bigPictureModule.classList.remove('hidden');
    pictureImg.src = photo.url;
    pictureImg.alt = photo.description;
    likesCnt.textContent = photo.likes;
    commentShownCnt.textContent = photo.comments.length;
    commentTotalCnt.textContent = photo.comments.length;
    socialCaption.textContent = photo.description;

    commentsList.innerHTML = '';

    photo.comments.forEach((comment) => {
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

    const commentCntModule = bigPictureModule.querySelector('.social__comment-count');
    const commentsLoader = bigPictureModule.querySelector('.comments-loader');
    commentCntModule.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    document.addEventListener('keydown', onEscKeyDown);

  }
};

const pictureCancel = document.getElementById('picture-cancel');
pictureCancel.addEventListener('click', closeBigPictureModule);

pictures.addEventListener('click', openBigPictureModule);
