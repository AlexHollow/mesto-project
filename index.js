//popup редактирования профиля
const profilePopup = document.querySelector('#profilePopup');
//popup создания карточки
const cardPopup = document.querySelector('#cardPopup');
//кнопка открытия popup'а редактирования профиля
const profileBtn = document.querySelector('.profile__edit-button');
//кнопка открытия popup'а создания карточки
const cardAddBtn = document.querySelector('.profile__add-button');
//nodelist с кнопками закрытия popup
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
//Имя профиля
const profileName = document.querySelector('.profile__name');
//Описание профиля
const profileDescription = document.querySelector('.profile__description');
//Инпут с именем профиля
const profileNameInput = profilePopup.querySelector('.form__text_type_name');
//Инпут с описанием профиля
const profileDescriptionInput = profilePopup.querySelector('.form__text_type_description')
//Форма редактирования профиля
const profileForm = document.querySelector('#profileForm');
//Форма создания карточки
const cardForm = document.querySelector('#cardForm');


//Функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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


