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

export {enableValidation, setEventListeners};