export class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteCard,
    api,
    user_id
  ) {
    this.data = data;
    this.cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this.handleDeleteCard = handleDeleteCard;
    this.api = api;
    this.user_id = user_id;

    this.liked = false;
    for (let i = 0; i < this.data.likes.length; i++) {
      const likes = this.data.likes[i]._id;
      if (likes === this.user_id) {
        this.liked = true;

        break;
      }
    }
  }

  getTemplate() {
    const cardElement = document
      .querySelector("#card")
      .content.querySelector(this.cardSelector)
      .cloneNode(true);
    this.cardImage = cardElement.querySelector(".card__background");
    this.cardTitle = cardElement.querySelector(".card__title");
    this.deleteCard = cardElement.querySelector(".card__delete");
    this.likeCard = cardElement.querySelector(".card__like");
    this.likesCard = cardElement.querySelector(".card__likes");
    this.cardImage.src = this.data.link;
    this.cardTitle.textContent = this.data.name;
    this.card_id = this.data._id;
    this.likesCard.textContent = this.data.likes.length;
    cardElement.append(this.cardImage);
    cardElement.append(this.cardTitle);
    if (this.data.owner._id != this.user_id) {
      this.deleteCard.remove();
    }
    if (this.liked) {
      this.likeCard.classList.add("card__like_active");
    }

    cardElement.append(this.likeCard);
    cardElement.append(this.likesCard);

    this.element = cardElement;
  }
  generateCard() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this.element.addEventListener("click", (e) => {
      if (e.target == this.deleteCard) {
        this._callHandleDeleteCard(e);
      } else if (e.target == this.likeCard) {
        this._handleLikeCard(e);
      } else if (e.target == this.cardImage) {
        this._handleImageClick(this.data);
      }
    });
  }

  _callHandleDeleteCard(e) {
    const popup = document.querySelector(".popup_delete");
    const popupSubmit = popup.querySelector(".popup__save");
    this.handleDeleteCard();

    popupSubmit.addEventListener("click", () => {
      const popupElm = document.querySelector(
        ".popup_delete .popup__container"
      );
      const popupSave = popupElm.querySelector(".popup__save");
      popupSave.textContent = "Saving..";
      this.api
        .deleteCard(this.card_id)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Delete request failed");
          }
        })
        .then((result) => {
          console.log(result);
          popupSave.textContent = "Ya";
          popup.classList.remove("popup_opened");
          const parent = e.target.closest(".card");
          parent.remove();
        })
        .catch((err) => console.log(err));
    });
  }
  _handleLikeCard(e) {
    e.target.classList.toggle("card__like_active");
    console.log(this.liked);
    if (!this.liked) {
      this.api
        .likeCard(this.card_id)
        .then((res) => res.json())
        .then((res) => {
          this.likesCard.textContent = res.likes.length;
          console.log(res);
        });
      this.liked = !this.liked;
    } else {
      this.api
        .deleteLikeCard(this.card_id)
        .then((res) => res.json())
        .then((res) => {
          this.likesCard.textContent = res.likes.length;
          console.log(res);
        });
      this.liked = !this.liked;
    }
  }
  _handleImageClick(data) {
    this.handleCardClick(data);
  }
}
