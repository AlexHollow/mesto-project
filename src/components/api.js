export class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  }

  //Обработка ответа сервера
  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Запрос карточек с сервера
  getInitialCards() {
    return fetch(`${this._link}/cards`, {
      headers: this._headers
    })
    .then((res) => this._handleServerResponse(res))
  }

  //Запрос информации о пользователе
  getUserInfo() {
    return fetch(`${this._link}/users/me`, {
      headers: this._headers
    })
    .then((res) => this._handleServerResponse(res))
  }

  //Отправка запроса редактирования профиля
  editProfileInfo(userData) {
    return fetch(`${this._link}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: userData.name,
        about: userData.description
      })
    })
    .then((res) => this._handleServerResponse(res))
  }

  //Отправка новой аватарки на сервер
  editAvatar(avatar) {
    return fetch(`${this._link}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar.avatarLink
      })
    })
    .then((res) => this._handleServerResponse(res))
  }

  //Запрос отправки новой карточки
  postNewCard(cardTitle, cardLink) {
    return fetch(`${this._link}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: cardTitle,
        link: cardLink
      })
    })
    .then((res) => this._handleServerResponse(res))
  }

  //Запрос на удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
    .then((res) => this._handleServerResponse(res))
  }

  //Запрос добавления лайка на карточку
  addLike(cardId) {
    return fetch(`${this._link}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: 'PUT'
    })
    .then((res) => this._handleServerResponse(res))
  }

  //Запрос удаления лайка на карточку
  deleteLike(cardId) {
    return fetch(`${this._link}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
    .then((res) => this._handleServerResponse(res))
  }
}


//Обработка ответа сервера
// function handleServerResponse(res) {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Ошибка: ${res.status}`);
// }


//Запрос карточек с сервера
// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers,
//   })
//   .then((res) => handleServerResponse(res))
// }


//Запрос информации о пользователе
// export const getUserInfo = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: config.headers,
//   })
//   .then((res) => handleServerResponse(res))
// }


// //Отправка запроса редактирования профиля
// export const editProfileInfo = (name, about) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: config.headers,
//     method: 'PATCH',
//     body: JSON.stringify({
//       name,
//       about,
//     }),
//   })
//   .then((res) => handleServerResponse(res))
// }


// //Отправка новой аватарки на сервер
// export const editAvatar = (avatar) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     headers: config.headers,
//     method: 'PATCH',
//     body: JSON.stringify({
//       avatar
//     }),
//   })
//   .then((res) => handleServerResponse(res))
// }


//Запрос отправки новой карточки
// export const postNewCard = (name, link) => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers,
//     method: 'POST',
//     body: JSON.stringify({
//       name,
//       link,
//     }),
//   })
//   .then((res) => handleServerResponse(res))
// }


//Запрос на удаление карточки
// export const deleteCard = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/${cardId}`, {
//     headers: config.headers,
//     method: 'DELETE',
//   })
//   .then((res) => handleServerResponse(res))
// }


//Запрос добавления лайка на карточку
// export const addLike = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     headers: config.headers,
//     method: 'PUT',
//   })
//   .then((res) => handleServerResponse(res))
// }


//Запрос удаления лайка на карточку
// export const deleteLike = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     headers: config.headers,
//     method: 'DELETE',
//   })
//   .then((res) => handleServerResponse(res))
// }
