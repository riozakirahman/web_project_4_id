import { userInfo } from "./userInfo.js";

export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.popup = document.querySelector(this.popupSelector);
  }

  open() {
    const popupClose = this.popup.querySelector(".popup__close");
    if (this.popupSelector == ".popup") {
      this.data.inputName.value = this.data.user.getUserInfo().name;
      this.data.inputJob.value = this.data.user.getUserInfo().job;
    }
    document.querySelector(this.popupSelector).classList.add("popup_opened");
    popupClose.addEventListener("click", () => {
      this.close();
    });
    this.popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    });

    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    document.querySelector(this.popupSelector).classList.remove("popup_opened");
  }
  _handleEscClose = (evt) => {
    if (evt.key == "Escape" || evt.key == "Esc") {
      this.close();
      document.removeEventListener("keydown", this._handleEscClose);
    }
  };

  setEventListeners() {
    this.open();
  }
}
