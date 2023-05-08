//Функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

//Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//Функция закрытия popup на клавишу Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');

    closePopup(openedPopup);
  }
}

//Функция рендера запроса
function renderRes(isLoading, button) {
  if (isLoading) {
    button.value = `${button.value}...`;
  } else {
    button.value = button.value.replace('...', '');
  }
}

export {openPopup, closePopup, renderRes};