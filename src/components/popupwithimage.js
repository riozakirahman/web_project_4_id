import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (name, link) => {
    super.open();
    if (this.popupSelector == ".popup_detail") {
      this.popUpDetail = document.querySelector(this.popupSelector);
      this.popUpDetailForm =
        this.popUpDetail.querySelector(".popup__container");
      this.detailImg = this.popUpDetailForm.querySelector(".popup__img");
      this.detailLabel = this.popUpDetailForm.querySelector(".popup__label");
      this.detailLabel.textContent = name;
      this.detailImg.src = link;
    }
  };

  _handleCardClick({ name, link }) {
    this.open(name, link);
  }
}
