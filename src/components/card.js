export class Card {
  constructor(cardObject, cardTemplateSelector, currentUserId, { cardId, cardAuthorId }, { handleCardZoom, handleCardDelete, handleCardAddLike, handleCardRemoveLike }) {
    //Данные карточки
    this._card = cardObject;
    this._cardTitle = this._card.name;
    this._cardImage = this._card.link;
    this._cardTemplate = cardTemplateSelector;
    //Данные пользователя
    this._currentUserId = currentUserId;
    this._cardId = cardId;
    this._cardAuthorId = cardAuthorId;
    //Данные для обработчиков
    this._cardZoom = handleCardZoom;
    this._cardDelete = handleCardDelete;
    this._cardAddLike = handleCardAddLike;
    this._cardRemoveLike = handleCardRemoveLike;
  }

  createCard() {
    this._cardElement = document.querySelector(this._cardTemplate).content.querySelector('.element').cloneNode(true);
    this._elementTitle = this._cardElement.querySelector('.element__title');
    this._elementImage = this._cardElement.querySelector('.element__image');
    this._elementDeleteButton = this._cardElement.querySelector('.element__delete-button');
    this._elementLikeButton = this._cardElement.querySelector('.element__like-button');
    this._elementLikeCounter = this._cardElement.querySelector('.element__like-counter');
    
    this._elementTitle.textContent = this._cardTitle;
    this._elementImage.src = this._cardImage;
    this._elementImage.alt = this._cardTitle;

    this.renderCardLikes(this._card);
    this._setEventListeners();

    return this._cardElement;
  }

  deleteCard() {
    this._cardElement.remove();
  }

  renderCardLikes(card) {
    this._likes = card.likes;
    this._elementLikeCounter.textContent = this._likes.length;

    if (this._isLiked()) {
      this._elementLikeButton.classList.add('element__like-button_active');
    } else {
      this._elementLikeButton.classList.remove('element__like-button_active');
    }
  }

  _isLiked() {
    return this._likes.find((cardOwner) => cardOwner._id === this._currentUserId);
  }

  _setEventListeners() {
    //Обработчик кнопки лайка
    this._elementLikeButton.addEventListener('click', () => {
      if (this._isLiked()) {
        this._cardRemoveLike(this._cardId);
      } else {
        this._cardAddLike(this._cardId);
      }
    });

    //Обработчик кнопки удаления
    if (this._cardAuthorId !== this._currentUserId) {
      this._elementDeleteButton.remove();
    } else {
      this._elementDeleteButton.addEventListener('click', () => this._cardDelete(this, this._cardId));
    }
    
    //Зум картинки
    this._elementImage.addEventListener('click', () => this._cardZoom(this._cardImage, this._cardTitle));
  }
}







//Функция создания карточки
// function createCard(title, link, likes, cardId, cardOwnerId) {
//   const card = cardTemplate.querySelector('.element').cloneNode(true);
//   const cardTitle = card.querySelector('.element__title');
//   const cardImage = card.querySelector('.element__image');
//   const cardDeleteButton = card.querySelector('.element__delete-button');
//   const cardLikeButton = card.querySelector('.element__like-button');

//   if (cardOwnerId !== currentUserId) {
//     cardDeleteButton.remove();
//   }

//   cardTitle.textContent = title;
//   cardImage.setAttribute('src', link);
//   cardImage.setAttribute('alt', title);

//   renderCardLikes(card, likes, currentUserId);

//   cardLikeButton.addEventListener('click', () => {
//     handleLikeButton(card, cardId);
//   });

//   cardDeleteButton.addEventListener('click', () => {
//     handleDeleteButton(card, cardId);
//   });

//   return card;
// }


// function renderCardLikes(card, likes, currentUserId) {
//   const cardLikeButton = card.querySelector('.element__like-button');
//   const cardLikesCounter = card.querySelector('.element__like-counter');
//   const isLiked = Boolean(likes.find((card) => card._id === currentUserId));
  
//   cardLikesCounter.textContent = likes.length.toString();
//   cardLikeButton.classList.toggle('element__like-button_active', isLiked)
// }

// //Удаление и добавление лайка
// function handleLikeButton(card, cardId) {
//   const cardLikeButton = card.querySelector('.element__like-button');

//   if (cardLikeButton.classList.contains('element__like-button_active')) {
//     deleteLike(cardId)
//       .then((data) => {
//         renderCardLikes(card, data.likes, currentUserId);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   } else {
//     addLike(cardId)
//       .then((data) => {
//         renderCardLikes(card, data.likes, currentUserId);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   }
// }


// //Удаление карточки
// function handleDeleteButton(card, cardId) {
//   deleteCard(cardId)
//     .then(() => {
//       card.remove();
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// }


// //Функция добавления карточки в начало списка
// function prependCard(title, link, likes, cardId, cardOwnerId) {
//   cardsList.prepend(createCard(title, link, likes, cardId, cardOwnerId));
// }

// export { createCard, prependCard };