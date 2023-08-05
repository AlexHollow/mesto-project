import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { popups, profilePopup, profileAvatarContainer, profileAvatar, avatarPopup, cardPopup,
  imagePopup, popupImage, popupImageTitle, profileBtn, cardAddBtn, popupCloseBtns, profileName,
  profileDescription, profileNameInput, profileDescriptionInput, cardTitleInput, cardLinkInput,
  avatarLinkInput, profileForm, cardForm, avatarForm, cardTemplate, cardsList, validationSettings, configApi } from '../components/utils/utils.js';

import './index.css';


//Переменная для хранения ID текущего пользователя
let currentUserId;

//Api
const api = new Api({ link: configApi.link, headers: configApi.headers });

//Данные пользователя
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
});

//Создание карточки
function renderCard(cardObject) {
  const cardItem = new Card(cardObject, '#newCard', currentUserId, { cardId: cardObject._id, cardAuthorId: cardObject.owner._id }, {
    handleCardZoom: () => { popupWithImage.open(cardItem._cardImage, cardItem._cardTitle) },

    handleCardDelete: () => {
      console.log(cardItem._cardId);
      api.deleteCard(cardItem._cardId)
        .then(() => {
          cardItem.deleteCard();
        })
        .catch((error) => {
          console.log(error);
        })
    },

    handleCardAddLike: () => {
      api.addLike(cardItem._cardId)
        .then((card) => {
          cardItem.renderCardLikes(card);
        })
        .catch((error) => {
          console.log(error);
        })
    },

    handleCardRemoveLike: () => {
      api.deleteLike(cardItem._cardId)
        .then((card) => {
          cardItem.renderCardLikes(card);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  });

  return cardItem.createCard();
}

//Рендерер карточек
const renderInitialcards = new Section({ renderer: (card) => { renderInitialcards.addItem(renderCard(card)) }}, '.elements__list');

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user.name, user.about)
    userInfo.setAvatar(user.avatar);
    currentUserId = user._id;
    renderInitialcards.renderItems(cards.reverse());
  })
  .catch((error) => {
    console.log(error);
  });

//Popup с картинкой
const popupWithImage = new PopupWithImage('#imagePopup');
popupWithImage.setEventListeners();

//Popup создания карточки
const popupCard = new PopupWithForm('#cardPopup', (cardInfo) => {
  popupCard.renderLoading(true);

  api.postNewCard(cardInfo.title, cardInfo.link)
    .then((card) => {
      renderInitialcards.addItem(renderCard(card));
      popupCard.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupCard.renderLoading(false);
    });
});
popupCard.setEventListeners();

//Popup редактирования профиля
const popupProfile = new PopupWithForm('#profilePopup',(userData) => {
  popupProfile.renderLoading(true);

  api.editProfileInfo(userData)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);

      popupProfile.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupProfile.renderLoading(false);
    });
});
popupProfile.setEventListeners();

//Popup редактирования аватарки
const popupAvatar = new PopupWithForm('#avatarPopup', (avatar) => {
  popupAvatar.renderLoading(true);

  api.editAvatar(avatar)
    .then((data) => {
      userInfo.setAvatar(data.avatar);
      popupAvatar.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
});
popupAvatar.setEventListeners();


//Валидация popup'ов
const popupCardValidation = new FormValidator(validationSettings, cardForm);
popupCardValidation.enableValidation();

const popupProfileValidation = new FormValidator(validationSettings, profileForm);
popupProfileValidation.enableValidation();

const popupAvatarValidation = new FormValidator(validationSettings, avatarForm);
popupAvatarValidation.enableValidation();


//Открытие popup'а создания карточки
cardAddBtn.addEventListener('click', () => {
  popupCard.open();
  popupCardValidation.resetValidation();
});

//Открытие popup'а редактирования профиля
profileBtn.addEventListener('click', () => {
  popupProfile.open();
  popupProfileValidation.resetValidation();

  const validUserInfo = userInfo.getUserInfo();
  profileNameInput.value = validUserInfo.userName;
  profileDescriptionInput.value = validUserInfo.userDescription;
});

// //Открытие popup'а редактирования аватарки
profileAvatarContainer.addEventListener('click', () => {
  popupAvatar.open();
  popupAvatarValidation.resetValidation();
});





// //Обработчик кнопок закрытия popup'ов
// popupCloseBtns.forEach((btn) => {
//   btn.addEventListener('click', (evt) => {
//     closePopup(evt.target.closest('.popup'));
//   });
// });


// //Открытие popup'а редактирования профиля
// profileBtn.addEventListener('click', () => {
//   openPopup(profilePopup);

//   activateSubmitButton(profileForm.querySelector('.form__button'), settings);

//   deleteErrorMessage(profileForm, settings);

//   profileNameInput.value = profileName.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
// });


// //Открытие popup'а создания карточки
// cardAddBtn.addEventListener('click', () => {
//   openPopup(cardPopup);

//   cardTitleInput.value = '';
//   cardLinkInput.value = '';

//   deleteErrorMessage(cardForm, settings);

//   disableSubmitButton(cardForm.querySelector('.form__button'), settings);
// });


// //Обработка формы редактирование профиля
// profileForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   renderRes(true, evt.submitter);

//   editProfileInfo(profileNameInput.value, profileDescriptionInput.value)
//     .then(() => {
//       profileName.textContent = profileNameInput.value;
//       profileDescription.textContent = profileDescriptionInput.value;

//       closePopup(profilePopup);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//     .finally(() => renderRes(false, evt.submitter));
// });


// //Открытие popup'а редактирования аватарки
// profileAvatarContainer.addEventListener('click', () => {
//   openPopup(avatarPopup);

//   avatarLinkInput.value = '';

//   deleteErrorMessage(avatarForm, settings);

//   disableSubmitButton(avatarForm.querySelector('.form__button'), settings);
// });


// //Обработка формы добавления карточки
// cardForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   const cardTitle = cardTitleInput.value;
//   const cardLink = cardLinkInput.value;

//   renderRes(true, evt.submitter);

//   postNewCard(cardTitle, cardLink)
//     .then((card) => {
//       prependCard(card.name, card.link, card.likes, card._id, card.owner._id);

//       evt.target.reset();

//       closePopup(cardPopup);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//     .finally(() => renderRes(false, evt.submitter)); 
// });


// //Обработка формы редактирования аватарки
// avatarForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   renderRes(true, evt.submitter);
  
//   editAvatar(avatarLinkInput.value)
//     .then(() => {
//       profileAvatar.setAttribute('src', avatarLinkInput.value);

//       closePopup(avatarPopup);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//     .finally(() => renderRes(false, evt.submitter));
// })


// //Обработчик попапов с фото
// cardsList.addEventListener('click', (evt) => {
//   if (evt.target.classList.contains('element__image')) {
//     popupImage.setAttribute('src', evt.target.getAttribute('src'));
//     popupImage.setAttribute('alt', evt.target.getAttribute('alt'));
//     popupImageTitle.textContent = evt.target.getAttribute('alt');

//     openPopup(imagePopup);
//   }
// });


// //Обработчик закрытия попапа по клику на оверлей
// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(evt.target);
//     }
//   });
// });


// Promise.all([getUserInfo(), getInitialCards()])
//   .then(([user, cards]) => {
//     profileName.textContent = user.name;
//     profileDescription.textContent = user.about;
//     profileAvatar.setAttribute('src', user.avatar);
//     currentUserId = user._id;

//     cards.forEach((card) => {
//       cardsList.append(createCard(card.name, card.link, card.likes, card._id, card.owner._id));
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

  
// Получение информации о пользователе
// getUserInfo()
//   .then((user) => {
//     profileName.textContent = user.name;
//     profileDescription.textContent = user.about;
//     profileAvatar.setAttribute('src', user.avatar);
//     currentUserId = user._id;

//     //Получение карточек с сервера
//     getInitialCards()
//       .then((cards) => {
//         cards.forEach((card) => {
//           cardsList.append(createCard(card.name, card.link, card.likes, card._id, card.owner._id));
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   })
//   .catch((error) => {
//     console.log(error);
//   });