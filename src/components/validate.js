//Функция валидации
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(form, settings);
  });
}


//Функция добавления обработчика 'input'
function setEventListeners(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  toggleButton(inputList, button, settings);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkValidity(form, input, settings);
      toggleButton(inputList, button, settings);
    });
  });
}


//Функция вывода ошибки на экран
function showInputError(form, input, errorMessage, settings) {
  const error = form.querySelector(`.form__error_type_${input.id}`);
  input.classList.add(settings.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(settings.errorClass);
}


//Функция скрытия ошибки
function hideInputError(form, input, settings) {
  const error = form.querySelector(`.form__error_type_${input.id}`);
  input.classList.remove(settings.inputErrorClass);
  error.textContent = '';
  error.classList.remove(settings.errorClass);
}


//Функция вывода или скрытия ошибки валидности input'а
function checkValidity(form, input, settings) {
  if(input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, settings);
  } else {
    hideInputError(form, input, settings);
  }
}


//Функция проверки - есть ли хотя бы один невалидный инпут
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function activateSubmitButton(button, settings) {
  button.classList.remove(settings.inactiveButtonClass);
  button.removeAttribute('disabled');
}

function disableSubmitButton(button, settings) {
  button.classList.add(settings.inactiveButtonClass);
  button.setAttribute('disabled', 'true');
}

//Функция отключения кнопки, если присутствует хотя бы один невалидный инпут
function toggleButton(inputList, button, settings) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(button, settings);
    // button.classList.add(settings.inactiveButtonClass);
    // button.setAttribute('disabled', 'true');
  } else {
    activateSubmitButton(button, settings);
    // button.classList.remove(settings.inactiveButtonClass);
    // button.removeAttribute('disabled');
  }
}


//Функция удаления сообщения ошибки валидации
function deleteErrorMessage(form, settings) {

  form.querySelectorAll(settings.inputSelector).forEach((input) => {
    input.classList.remove(settings.inputErrorClass);
  })

  form.querySelectorAll(settings.errorSpanClass).forEach((error) => {
    error.classList.remove(settings.errorClass);
  });
}

export {enableValidation, deleteErrorMessage, activateSubmitButton};