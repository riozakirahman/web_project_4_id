import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.handleFormSubmit = handleSubmit;
    this.popup = document.querySelector(this.popupSelector);
    this.popupForm = this.popup.querySelector(".popup__container");
  }
  _getInputValues = () => {
    if (this.popupSelector === ".popup") {
      this.inputName = this.popup.querySelector(".popup__input_name").value;
      this.inputJob = this.popup.querySelector(".popup__input_about").value;
      return {
        name: this.inputName,
        job: this.inputJob,
      };
    } else if (this.popupSelector === ".popup_add") {
      this.popupAddName = this.popup.querySelector(
        ".popup__input_name-card"
      ).value;
      this.popupAddLink = this.popup.querySelector(
        ".popup__input_link-card"
      ).value;
      return {
        name: this.popupAddName,
        link: this.popupAddLink,
      };
    }
  };
  _callHandleFormSubmit() {
    this.handleFormSubmit();
  }

  setEventListeners = () => {
    super.setEventListeners();

    const handleSubmit = (evt) => {
      evt.preventDefault();
      this._callHandleFormSubmit();

      this.popupForm.removeEventListener("submit", handleSubmit);
    };

    this.popupForm.addEventListener("submit", handleSubmit);
  };
}
