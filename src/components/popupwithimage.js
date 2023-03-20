import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage) {
    super(popupSelector);
    this.popupImage = popupImage;
  }

  open({ name, link }) {
    super.open();
    this.popUpDetail = document.querySelector(this.popupSelector);
    this.popUpDetailForm = this.popUpDetail.querySelector(".popup__container");
    this.detailImg = this.popUpDetailForm.querySelector(".popup__img");
    this.detailLabel = this.popUpDetailForm.querySelector(".popup__label");
    this.detailLabel.textContent = name;
    this.detailImg.src = link;
    this.popupImage = true;
  }
}
