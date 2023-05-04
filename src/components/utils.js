//Nodelist с popup'ами
const popups = document.querySelectorAll('.popup');
//popup редактирования профиля
const profilePopup = document.querySelector('#profilePopup');
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
//Форма редактирования профиля
const profileForm = document.querySelector('#profileForm');
//Форма создания карточки
const cardForm = document.querySelector('#cardForm');
//Темплейт с карточкой
const cardTemplate = document.querySelector('#newCard').content;
//Список с карточками
const cardsList = document.querySelector('.elements__list');


//Массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


export {popups, profilePopup, cardPopup, imagePopup, popupImage, popupImageTitle, profileBtn,
  cardAddBtn, popupCloseBtns, profileName, profileDescription, profileNameInput, profileDescriptionInput,
  cardTitleInput, cardLinkInput, profileForm, cardForm, cardTemplate, cardsList, initialCards}