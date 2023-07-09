class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
  }

  _request(endPoint, options) {
    return fetch(this._url + endPoint, options).then(this._getResponseData);
  }

  _getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  getCards = () => {
    return this._request("/cards", {
      headers: {
        authorization: this._token,
      },
    });
  };

  updateProfileData = (inputValues) => {
    return this._request("/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about,
      }),
    });
  };

  getWebInfo = () => {
    return this._request("/users/me", {
      headers: {
        authorization: this._token,
      },
    });
  };

  sendNewCard = (inputValues) => {
    return this._request("/cards", {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValues.place,
        link: inputValues.link,
      }),
    });
  };

  removeCard = (id) => {
    return this._request("/cards/" + id, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    });
  };

  toggleLikeCard = (cardId, isLiked) => {
    const method = isLiked ? "PUT" : "DELETE";

    return this._request(`/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: this._token,
      },
    });
  };

  sendAvatar = (link) => {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    });
  };
}

// Объект настроек для класса Api
const config = {
  url: "https://mesto.nomoreparties.co/v1/cohort-66",
  token: "11d9edf0-d595-4b63-9e37-e0fd6cd15a36"
};

// Создание экземпляра класса, описывающего запросы к серверу
const api = new Api(config);

export default api;
