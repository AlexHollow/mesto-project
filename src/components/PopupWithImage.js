import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__image-title');
  }

  open(image, title) {
    this._popupImage.src = image;
    this._popupImage.title = image;
    this._popupTitle.textContent = title;
    
    super.open();
  }
}