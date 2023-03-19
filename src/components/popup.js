import { userInfo } from "./userInfo";
export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.popup = document.querySelector(this.popupSelector);
  }

  open() {
    document.querySelector(this.popupSelector).classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this.popupClose = this.popup.querySelector(".popup__close");
    this.popupClose.addEventListener("click", () => {
      document
        .querySelector(this.popupSelector)
        .classList.remove("popup_opened");
    });
    this.popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        document
          .querySelector(this.popupSelector)
          .classList.remove("popup_opened");
      }
    });
  }
  _handleEscClose = (evt) => {
    if (evt.key == "Escape" || evt.key == "Esc") {
      document
        .querySelector(this.popupSelector)
        .classList.remove("popup_opened");

      document.removeEventListener("keydown", this._handleEscClose);
    }
  };

  setEventListeners() {
    this.open();
    this.close();
  }
}
