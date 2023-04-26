//Функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}


//Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export {openPopup, closePopup};