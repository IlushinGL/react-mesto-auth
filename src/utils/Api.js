import {API_DATA} from './constants';

class Api {
  constructor({server, cohortId, token, user, avatar, cards, like}) {
    // на вход поступает один объект с указанными  ключами, значения которых
    // используются для конструирования запросов к серверу
    this._baseURL = server + cohortId;
    this._auth = {
      authorization: token,
      'Content-Type': 'application/json'
    };
    this._user = user;
    this._avatar = avatar;
    this._cards = cards;
    this._like = like;
  }

  _handleResponse(response, errTitle) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`ApiErr_${errTitle}=${response.status}`);
  }

  getInitialCards() {
    return fetch(
      this._baseURL + this._cards,
      {
      method: 'GET',
      headers: this._auth
    })
    .then((res) => {return this._handleResponse(res, 'getInitialCards')});
  }

  getUserInfo() {
    return fetch(
      this._baseURL + this._user,
      {
      method: 'GET',
      headers: this._auth
    })
    .then((res) => {return this._handleResponse(res, 'getUserInfo')});
  }

  setUserInfo({name, about}) {
    return fetch(
      this._baseURL + this._user,
      {
      method: 'PATCH',
      headers: this._auth,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => {return this._handleResponse(res, 'setUserInfo')});
  }

  addNewCard({link, name}) {
    return fetch(
      this._baseURL + this._cards,
      {
      method: 'POST',
      headers: this._auth,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {return this._handleResponse(res, 'addNewCard')});
  }

  deleteCard(id) {
    return fetch(
      this._baseURL + this._cards + '/' + id,
      {
      method: 'DELETE',
      headers: this._auth
    })
    .then((res) => {return this._handleResponse(res, 'deleteCard')});
  }

  likeCard(id, like) {
    // Если like пропущена или false, то лайк удаляется, иначе - добавляется
    return fetch(
      this._baseURL + this._cards + '/' + id + this._like,
      {
      method: like ? 'PUT' : 'DELETE',
      headers: this._auth
    })
    .then((res) => {return this._handleResponse(res, like ? 'likeCard_yes' : 'likeCard_no')});
  }

  setUserAvatar(link) {
    return fetch(
      this._baseURL + this._user + this._avatar,
      {
      method: 'PATCH',
      headers: this._auth,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then((res) => {return this._handleResponse(res, 'setUserAvatar')});
  }
}

export const apInterface = new Api(API_DATA);
