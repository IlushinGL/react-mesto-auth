import {AUTH_DATA} from './constants';

class Auth {
  constructor({server, signUp, signIn, user}) {
    // на вход поступает один объект с указанными  ключами, значения которых
    // используются для конструирования запросов к серверу
    this._baseURL = server;
    this._signUp = signUp;
    this._signIn = signIn;
    this._user = user;
    this._headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  _handleResponse(response, errTitle) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`AuthErr_${errTitle}=${response.status}`);
  }

  register({email, password}) {
    return fetch(
      this._baseURL + this._signUp,
      {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then((res) => {return this._handleResponse(res, 'register')});
  }

  login({email, password}) {
    return fetch(
      this._baseURL + this._signIn,
      {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then((res) => {return this._handleResponse(res, 'login')});
  }

  checkToken(jwt) {
    return fetch(
      this._baseURL + this._user,
      {
      method: 'GET',
      headers: {...this._headers, ...{ Authorization : `Bearer ${jwt}` }},
    })
    .then((res) => {return this._handleResponse(res, 'checkToken')});
  }
}

export const apiUserAuth = new Auth(AUTH_DATA);
