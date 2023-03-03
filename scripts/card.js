import { openPopUp } from "./utils.js";

export class card {
  constructor(data, cardSelector) {
    this.data = data;
    this.cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#card")
      .content.querySelector(this.cardSelector)
      .cloneNode(true);
    this.cardImage = cardElement.querySelector(".card__background");
    this.cardTitle = cardElement.querySelector(".card__title");
    this.deleteCard = cardElement.querySelector(".card__delete");
    this.likeCard = cardElement.querySelector(".card__like");
    this.cardImage.src = this.data.link;
    this.cardTitle.textContent = this.data.name;
    cardElement.append(this.cardImage);
    cardElement.append(this.cardTitle);
    cardElement.append(this.deleteCard);
    cardElement.append(this.likeCard);

    this.element = cardElement;
  }
  generateCard() {
    this._setEventListeners();
    const cards = document.querySelector(".cards");
    cards.append(this.element);
  }
  generateNewCard() {
    this._setEventListeners();
    const cards = document.querySelector(".cards");
    cards.prepend(this.element);
  }

  _setEventListeners() {
    this.element.addEventListener("click", (e) => {
      if (e.target == this.deleteCard) {
        this._handleDeleteCard(e);
      } else if (e.target == this.likeCard) {
        this._handleLikeCard(e);
      } else if (e.target == this.cardImage) {
        this._handleImageClick(e);
      }
    });
  }

  _handleDeleteCard(e) {
    let parent = e.target.closest(".card");
    parent.remove();
  }
  _handleLikeCard(e) {
    e.target.classList.toggle("card__like_active");
  }
  _handleImageClick(e) {
    const popUpDetail = document.querySelector(".popup_detail");
    const popUpDetailForm = popUpDetail.querySelector(".popup__container");
    const detailImg = popUpDetailForm.querySelector(".popup__img");
    const detailLabel = popUpDetailForm.querySelector(".popup__label");
    detailLabel.textContent = this.data.name;
    detailImg.src = this.data.link;
    openPopUp(e);
  }
}
