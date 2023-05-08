const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
    authorization: '0020037f-5ec5-482e-b06e-c2ac55bfd33d',
    'Content-Type': 'application/json',
  }
}


//Обработка ответа сервера
function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


//Запрос карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then((res) => handleServerResponse(res))
}


//Запрос информации о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then((res) => handleServerResponse(res))
}


//Отправка запроса редактирования профиля
export const editProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name,
      about,
    }),
  })
  .then((res) => handleServerResponse(res))
}


//Отправка новой аватарки на сервер
export const editAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar
    }),
  })
  .then((res) => handleServerResponse(res))
}


//Запрос отправки новой карточки
export const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name,
      link,
    }),
  })
  .then((res) => handleServerResponse(res))
}


//Запрос на удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then((res) => handleServerResponse(res))
}


//Запрос добавления лайка на карточку
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT',
  })
  .then((res) => handleServerResponse(res))
}


//Запрос удаления лайка на карточку
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then((res) => handleServerResponse(res))
}
