const classListValidation = {
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: '.form__error',
  errorClass: 'form__error_active',
}

//Функция валидации
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(classListValidation.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(form);
  });
}


//Функция добавления обработчика 'input'
function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll(classListValidation.inputSelector));
  const button = form.querySelector(classListValidation.submitButtonSelector);

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
  error.classList.add(classListValidation.errorClass);
}


//Функция скрытия ошибки
function hideInputError(form, input) {
  const error = form.querySelector(`.form__error_type_${input.id}`);
  input.classList.remove('form__text_type_error');
  error.textContent = '';
  error.classList.remove(classListValidation.errorClass);
}


//Функция вывода или скрытия ошибки валидности input'а
function checkValidity(form, input) {
  if(input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

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
    button.classList.add(classListValidation.inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
  } else {
    button.classList.remove(classListValidation.inactiveButtonClass);
    button.removeAttribute('disabled', 'disabled');
  }
}

//Функция удаления сообщения ошибки валидации
function deleteErrorMessage(form) {

  form.querySelectorAll(classListValidation.inputSelector).forEach((input) => {
    input.classList.remove('form__text_type_error');
  })

  form.querySelectorAll(classListValidation.inputErrorClass).forEach((error) => {
    error.classList.remove(classListValidation.errorClass);
  });
}

export {enableValidation, setEventListeners, deleteErrorMessage};