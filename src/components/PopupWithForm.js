import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._formInputList = this._form.querySelectorAll('.form__text');
    this._buttonSubmit = this._form.querySelector('.form__button');
    this._buttonSubmitText = this._buttonSubmit.value;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputsValues = {};
    this._formInputList.forEach(input => {
      this._inputsValues[input.name] = input.value;
    });

    return this._inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._buttonSubmit.value = 'Сохранение...';
    } else {
      this._buttonSubmit.value = this._buttonSubmitText;
    }
  }
}