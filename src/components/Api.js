export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handlePromiseRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then(res => {
      return this._handlePromiseRes(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(res => {
      return this._handlePromiseRes(res);
    });
  }

  patchUserProfile({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => {
      return this._handlePromiseRes(res);
    });
  }

  patchUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => {
      return this._handlePromiseRes(res);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => {
      return this._handlePromiseRes(res);
    });
  }

  deleteCard({ _id }) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._handlePromiseRes(res);
    });
  }

  likeCard({ _id }) {
    return fetch(`${this._url}/cards/likes/${_id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(res => {
      return this._handlePromiseRes(res);
    });
  }

  unlikeCard({ _id }) {
    return fetch(`${this._url}/cards/likes/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      return this._handlePromiseRes(res);
    });
  }
}
