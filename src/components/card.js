import {cardTemplate, cardsList} from './index.js';

//Функция создания карточки
function createCard(title, link) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);

  card.querySelector('.element__title').textContent = title;
  card.querySelector('.element__image').setAttribute('src', link);
  card.querySelector('.element__image').setAttribute('alt', title);

  return card;
}

//Функция добавления карточки в начало списка
function addCard(card) {
  cardsList.prepend(card);
}

export {createCard, addCard};