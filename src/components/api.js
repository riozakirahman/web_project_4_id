export class Api {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  async getUser() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      });
  }
  async getCard() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      });
  }
  async createCard(name, link) {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  async editProfile(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      });
  }
  async deleteCard(cardsId) {
    return fetch(`${this.url}/cards/${cardsId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  async likeCard(cardsId) {
    return fetch(`${this.url}/cards/likes/${cardsId}`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  async deleteLikeCard(cardsId) {
    return fetch(`${this.url}/cards/likes/${cardsId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  async editImageProfile(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }
}
