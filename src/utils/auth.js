class Authorization {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _request(endPoint, options) {
    return fetch(this._baseUrl + endPoint, options).then(this._getResponseData);
  }

  _getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  signUp = (values) => {
    return this._request("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: values.password,
        email: values.email,
      }),
    });
  };

  signIn = (email, password) => {
    return this._request("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    });
  };

  checkToken = (token) => {
    return this._request("/users/me", {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
  }
}

const config = {
  baseUrl: "https://auth.nomoreparties.co",
};

const auth = new Authorization(config);

export default auth;
