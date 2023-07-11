class Authorization {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _request(endPoint, options) {
    return fetch(this._url + endPoint, options).then(this._getResponseData);
  }

  _getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  signUp = (values) => {
    return this._request("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify ({
        password: values.password,
        email: values.email
      })
    })
  }
}

const config = {
  baseUrl: "https://auth.nomoreparties.co",
};

const auth = new Authorization(config);

export default auth;
