import {enableValidation, setEventListeners, deleteErrorMessage} from './validate.js';
import {createCard, addCard} from './card.js';
import {openPopup, closePopup} from './modal.js';
import {popups, profilePopup, cardPopup, imagePopup, popupImage, popupImageTitle, profileBtn,
  cardAddBtn, popupCloseBtns, profileName, profileDescription, profileNameInput, profileDescriptionInput,
  cardTitleInput, cardLinkInput, profileForm, cardForm, cardTemplate, cardsList, initialCards} from './utils.js';

import '../pages/index.css';

export {cardTemplate, cardsList};

//Вызов функции валидации
enableValidation();


//Обработчик кнопок закрытия popup'ов
popupCloseBtns.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    if (evt.target.closest('.popup') === profilePopup) {

      deleteErrorMessage(profileForm);

      closePopup(evt.target.closest('.popup'));
    }

    closePopup(evt.target.closest('.popup'));
  });
});


//Открытие popup'а редактирования профиля
profileBtn.addEventListener('click', () => {
  openPopup(profilePopup);

  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  setEventListeners(profileForm);
});

//Открытие popup'а создания карточки
cardAddBtn.addEventListener('click', () => {
  openPopup(cardPopup);
  setEventListeners(cardForm);
});


//Обработка формы редактирование профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closePopup(profilePopup);
});


//Обработка формы добавления карточки
cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardTitle = cardTitleInput.value;
  const cardLink = cardLinkInput.value;

  addCard(createCard(cardTitle, cardLink));

  evt.target.reset();

  closePopup(cardPopup);
});


//Добавление карточек из массива
initialCards.forEach((el) => {
  addCard(createCard(el.name, el.link));
});


//Обработчик кнопок лайка карточек
cardsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__like-button')) {
    evt.target.classList.toggle('element__like-button_active');
  }
});


//Обработчик кнопок удаления карточки
cardsList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__delete-button')) {
    evt.target.closest('.element').remove();
  }
});


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
popups.forEach((el) => {
  el.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  });
});


//Обработчик закрытия попапа на клавишу Escape
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    popups.forEach((el) => {
      if (el === profilePopup) {
        
        deleteErrorMessage(profileForm);

        closePopup(el);
      }

      closePopup(el);
    });
  }
});