import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  _handleCardClick({ name, link }) {
    this.popUpDetail = document.querySelector(this.popupSelector);
    this.popUpDetailForm = this.popUpDetail.querySelector(".popup__container");
    this.detailImg = this.popUpDetailForm.querySelector(".popup__img");
    this.detailLabel = this.popUpDetailForm.querySelector(".popup__label");
    this.detailLabel.textContent = name;
    this.detailImg.src = link;
    this.open();
    this.close();
  }
}
