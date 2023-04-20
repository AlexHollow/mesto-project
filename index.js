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


//Функция создания карточки
function createCard(title, link) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);

  card.querySelector('.element__title').textContent = title;
  card.querySelector('.element__image').setAttribute('src', link);
  card.querySelector('.element__image').setAttribute('alt', title);

  // card.querySelector('.element__like-button').addEventListener('click', (evt) => {
  //   evt.target.classList.toggle('element__like-button_active');
  // });

  // card.querySelector('.element__delete-button').addEventListener('click', (evt) => {
  //   evt.target.closest('.element').remove();
  // });

  // card.querySelector('.element__image').addEventListener('click', (evt) => {
  //   popupImage.setAttribute('src', evt.target.getAttribute('src'));
  //   popupImage.setAttribute('alt', evt.target.getAttribute('alt'));
  //   popupImageTitle.textContent = evt.target.getAttribute('alt');

  //   openPopup(imagePopup);
  // });

  return card;
}


//Функция добавления карточки в начало списка
function addCard(card) {
  cardsList.prepend(card);
}


//Функция валидации
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(form);
  });
}

enableValidation();

//Функция добавления обработчика 'input'
function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll('.form__text'));
  const button = form.querySelector('.form__button');

  toggleButton(inputList, button);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkValidity(form, input);
      toggleButton(inputList, button);
    });
  });
}


//Функция вывода ошибки на экран
function showInputError(form, input, errorMessage) {
  const error = form.querySelector(`.form__error_type_${input.id}`);
  input.classList.add('form__text_type_error');
  error.textContent = errorMessage;
  error.classList.add('form__error_active');
}


//Функция скрытия ошибки
function hideInputError(form, input) {
  const error = form.querySelector(`.form__error_type_${input.id}`);
  input.classList.remove('form__text_type_error');
  error.textContent = '';
  error.classList.remove('form__error_active');
}


//Функция вывода или скрытия ошибки валидности input'а
function checkValidity(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}


//Функция проверки - есть ли хотя бы один невалидный инпут
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}


//Функция отключения кнопки, если присутствует хотя бы один невалидный инпут
function toggleButton(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.classList.add('form__button_disabled');
  } else {
    button.classList.remove('form__button_disabled');
  }
}


//Обработчик кнопок закрытия popup'ов
popupCloseBtns.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    if (evt.target.closest('.popup') === profilePopup) {

      profileForm.querySelectorAll('.form__text').forEach((input) => {
        input.classList.remove('form__text_type_error');
      })

      profileForm.querySelectorAll('.form__error').forEach((error) => {
        error.classList.remove('form__error_active');
      });

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
      closePopup(el);
    });
  }
});