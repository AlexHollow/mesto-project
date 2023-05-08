import { cardTemplate, cardsList } from './index.js';
import { deleteCard, addLike, deleteLike } from './api.js';
import { currentUserId } from './index.js';


//Функция создания карточки
function createCard(title, link, likes, cardId, cardOwnerId) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const cardTitle = card.querySelector('.element__title');
  const cardImage = card.querySelector('.element__image');
  const cardDeleteButton = card.querySelector('.element__delete-button');
  const cardLikeButton = card.querySelector('.element__like-button');

  if (cardOwnerId !== currentUserId) {
    cardDeleteButton.remove();
  }

  cardTitle.textContent = title;
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', title);

  renderCardLikes(card, likes, currentUserId);

  cardLikeButton.addEventListener('click', () => {
    handleLikeButton(card, cardId);
  });

  cardDeleteButton.addEventListener('click', () => {
    handleDeleteButton(card, cardId);
  });

  return card;
}


function renderCardLikes(card, likes, currentUserId) {
  const cardLikeButton = card.querySelector('.element__like-button');
  const cardLikesCounter = card.querySelector('.element__like-counter');
  const isLiked = Boolean(likes.find((card) => card._id === currentUserId));
  
  cardLikesCounter.textContent = likes.length.toString();
  cardLikeButton.classList.toggle('element__like-button_active', isLiked)
}

//Удаление и добавление лайка
function handleLikeButton(card, cardId) {
  const cardLikeButton = card.querySelector('.element__like-button');

  if (cardLikeButton.classList.contains('element__like-button_active')) {
    deleteLike(cardId)
      .then((data) => {
        renderCardLikes(card, data.likes, currentUserId);
      })
      .catch((error) => {
        console.log(error);
      })
  } else {
    addLike(cardId)
      .then((data) => {
        renderCardLikes(card, data.likes, currentUserId);
      })
      .catch((error) => {
        console.log(error);
      })
  }
}


//Удаление карточки
function handleDeleteButton(card, cardId) {
  deleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((error) => {
      console.log(error);
    })
}


//Функция добавления карточки в начало списка
function prependCard(title, link, likes, cardId, cardOwnerId) {
  cardsList.prepend(createCard(title, link, likes, cardId, cardOwnerId));
}

export { createCard, prependCard };