//popup редактирования профиля
const profilePopup = document.querySelector('#profilePopup');
//popup создания карточки
const cardPopup = document.querySelector('#cardPopup');
//Кнопка открытия popup'а редактирования профиля
const profileBtn = document.querySelector('.profile__edit-button');
//Кнопка открытия popup'а создания карточки
const cardAddBtn = document.querySelector('.profile__add-button');
//Nodelist с кнопками закрытия popup
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
//Nodelist с кнопками удаления карточек
const cardDeleteBtns = document.querySelectorAll('.element__delete-button');
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


//Функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Функция добавления карточки
function addCard(title, link) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);

  card.querySelector('.element__title').textContent = title;
  card.querySelector('.element__image').setAttribute('src', link);
  card.querySelector('.element__image').setAttribute('alt', title);

  card.querySelector('.element__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });

  card.querySelector('.element__delete-button').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });

  cardsList.prepend(card);
}


//Закрытие popup
popupCloseBtns.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    evt.target.closest('.popup').classList.remove('popup_opened');
  });
});


//Открытие popup'а редактирования профиля
profileBtn.addEventListener('click', () => openPopup(profilePopup));
//Открытие popup'а создания карточки
cardAddBtn.addEventListener('click', () => openPopup(cardPopup));


//Отображение имени и описания профиля в форме
profileNameInput.value = profileName.textContent;
profileDescriptionInput.value = profileDescription.textContent;


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

  addCard(cardTitle, cardLink);

  cardTitleInput.value = '';
  cardLinkInput.value = '';

  closePopup(cardPopup);
});


//Добавление карточек из массива
initialCards.forEach((el) => {
  addCard(el.name, el.link);
});