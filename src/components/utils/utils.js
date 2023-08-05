//Nodelist с popup'ами
const popups = document.querySelectorAll('.popup');
//popup редактирования профиля
const profilePopup = document.querySelector('#profilePopup');
//Контейнер с аватаркой
const profileAvatarContainer = document.querySelector('.profile__avatar-container');
//Аватарка
const profileAvatar = document.querySelector('.profile__avatar');
//popup редактирования аватарки
const avatarPopup = document.querySelector('#avatarPopup');
//popup создания карточки
const cardPopup = document.querySelector('#cardPopup');
//popup с изображением карточки
const imagePopup = document.querySelector('#imagePopup');
//Картинка popup'а
const popupImage = imagePopup.querySelector('.popup__image');
//Название картинки popup'а
const popupImageTitle = imagePopup.querySelector('.popup__image-title');
//Кнопка открытия popup'а редактирования профиля
const profileBtn = document.querySelector('.profile__edit-button');
//Кнопка открытия popup'а создания карточки
const cardAddBtn = document.querySelector('.profile__add-button');
//Nodelist с кнопками закрытия popup
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
//Имя профиля
const profileName = document.querySelector('.profile__name');
//Описание профиля
const profileDescription = document.querySelector('.profile__description');
//Инпут с именем профиля
const profileNameInput = profilePopup.querySelector('.form__text_type_name');
//Инпут с описанием профиля
const profileDescriptionInput = profilePopup.querySelector('.form__text_type_description');
//Инпут с названием карточки
const cardTitleInput = cardPopup.querySelector('.form__text_type_name');
//Инпут с ссылкой на картинку для карточки
const cardLinkInput = cardPopup.querySelector('.form__text_type_description');
//Инпут с ссылкой на аватарку
const avatarLinkInput = avatarPopup.querySelector('#avatarRef');
//Форма редактирования профиля
const profileForm = document.querySelector('#profileForm');
//Форма создания карточки
const cardForm = document.querySelector('#cardForm');
//Форма редактирования аватарки
const avatarForm = document.querySelector('#avatarForm');
//Темплейт с карточкой
const cardTemplate = document.querySelector('#newCard').content;
//Список с карточками
const cardsList = document.querySelector('.elements__list');


// Объект с селекторами для валидации
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__text_type_error',
  errorSpanClass: '.form__error',
  errorClass: 'form__error_active',
}


const configApi = {
  link: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
    authorization: '0020037f-5ec5-482e-b06e-c2ac55bfd33d',
    'Content-Type': 'application/json',
  }
}

export { popups, profilePopup, profileAvatarContainer, profileAvatar, avatarPopup, cardPopup,
  imagePopup, popupImage, popupImageTitle, profileBtn, cardAddBtn, popupCloseBtns, profileName,
  profileDescription, profileNameInput, profileDescriptionInput, cardTitleInput, cardLinkInput,
  avatarLinkInput, profileForm, cardForm, avatarForm, cardTemplate, cardsList, validationSettings, configApi }
