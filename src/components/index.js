import { enableValidation, deleteErrorMessage, activateSubmitButton, disableSubmitButton } from './validate.js';
import { createCard, prependCard } from './card.js';
import { openPopup, closePopup, renderRes } from './modal.js';
import { popups, profilePopup, profileAvatarContainer, profileAvatar, avatarPopup, cardPopup, imagePopup, popupImage, popupImageTitle, profileBtn,
  cardAddBtn, popupCloseBtns, profileName, profileDescription, profileNameInput, profileDescriptionInput,
  cardTitleInput, cardLinkInput, avatarLinkInput, profileForm, cardForm, avatarForm, cardTemplate, cardsList, settings } from './utils.js';
import { getInitialCards, getUserInfo, editProfileInfo, editAvatar, postNewCard } from './api.js';

import '../pages/index.css';

export { cardTemplate, cardsList };

//Переменная для хранения ID текущего пользователя
export let currentUserId = '';

//Вызов функции валидации
enableValidation(settings);


//Обработчик кнопок закрытия popup'ов
popupCloseBtns.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});


//Открытие popup'а редактирования профиля
profileBtn.addEventListener('click', () => {
  openPopup(profilePopup);

  activateSubmitButton(profileForm.querySelector('.form__button'), settings);

  deleteErrorMessage(profileForm, settings);

  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});


//Открытие popup'а создания карточки
cardAddBtn.addEventListener('click', () => {
  openPopup(cardPopup);
  disableSubmitButton(cardForm.querySelector('.form__button'), settings);
});


//Обработка формы редактирование профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderRes(true, evt.submitter);

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  editProfileInfo(profileNameInput.value, profileDescriptionInput.value)
    .catch((error) => {
      console.log(error);
    })
    .finally(() => renderRes(false, evt.submitter));

  closePopup(profilePopup);
});


//Открытие popup'а редактирования аватарки
profileAvatarContainer.addEventListener('click', () => {
  openPopup(avatarPopup);

  avatarLinkInput.value = profileAvatar.getAttribute('src');

  activateSubmitButton(avatarForm.querySelector('.form__button'), settings);

  deleteErrorMessage(avatarForm, settings);
});


//Обработка формы добавления карточки
cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardTitle = cardTitleInput.value;
  const cardLink = cardLinkInput.value;

  renderRes(true, evt.submitter);

  postNewCard(cardTitle, cardLink)
    .then((card) => {
      prependCard(card.name, card.link, card.likes, card._id, card.owner._id);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => renderRes(false, evt.submitter));
  
  evt.target.reset();

  closePopup(cardPopup);
});


//Обработка формы редактирования аватарки
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderRes(true, evt.submitter);
  
  editAvatar(avatarLinkInput.value)
    .then(() => {
      profileAvatar.setAttribute('src', avatarLinkInput.value);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => renderRes(false, evt.submitter));

  closePopup(avatarPopup);
})


//Обработчик попапов с фото
cardsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__image')) {
    popupImage.setAttribute('src', evt.target.getAttribute('src'));
    popupImage.setAttribute('alt', evt.target.getAttribute('alt'));
    popupImageTitle.textContent = evt.target.getAttribute('alt');

    openPopup(imagePopup);
  }
});


//Обработчик закрытия попапа по клику на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  });
});


// Получение информации о пользователе
getUserInfo()
  .then((user) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.setAttribute('src', user.avatar);
    currentUserId = user._id;

    //Получение карточек с сервера
    getInitialCards()
      .then((cards) => {
        cards.forEach((card) => {
          cardsList.append(createCard(card.name, card.link, card.likes, card._id, card.owner._id));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });