export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._formInputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._formSubmitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  enableValidation() {
    this.setEventListeners();
  }

  setEventListeners() {
    this._toggleButton();
  
    this._formInputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidity(input);
        this._toggleButton();
      });
    });
  }

  _showInputError(input, errorMessage) {
    const error = this._formElement.querySelector(`.form__error_type_${input.id}`);
    input.classList.add(this._settings.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._settings.errorClass);
  }

  _hideInputError(input) {
    const error = this._formElement.querySelector(`.form__error_type_${input.id}`);
    input.classList.remove(this._settings.inputErrorClass);
    error.textContent = '';
    error.classList.remove(this._settings.errorClass);
  }

  _checkValidity(input) {
    if(input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity('');
    }
  
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._formInputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _activateSubmitButton() {
    this._formSubmitButton.classList.remove(this._settings.inactiveButtonClass);
    this._formSubmitButton.removeAttribute('disabled');
  }

  _disableSubmitButton() {
    this._formSubmitButton.classList.add(this._settings.inactiveButtonClass);
    this._formSubmitButton.setAttribute('disabled', 'true');
  }

  _toggleButton() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._activateSubmitButton();
    }
  }

  resetValidation() {
    this._formInputList.forEach((input) => {this._hideInputError(input)});
    this._toggleButton();
  }
}