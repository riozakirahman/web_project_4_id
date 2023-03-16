import Popup from "./popup.js";
import { card } from "./card.js";
import PopupWithImage from "./popupwithimage.js";
import { userInfo } from "./userInfo.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this.data = data;
    this.popup = document.querySelector(this.popupSelector);
    this.popupForm = this.popup.querySelector(".popup__container");
  }
  _getInputValues = () => {};

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.popupSelector == ".popup") {
      const user = new userInfo({
        name: this.data.inputName.value,
        job: this.data.inputJob.value,
      });

      this.data.profileName.textContent = user.getUserInfo().name;
      this.data.profileJob.textContent = user.getUserInfo().job;
      this.close();
    } else if (this.popupSelector == ".popup_add") {
      const popupImage = new PopupWithImage(".popup_detail");

      const newCard = {
        name: this.data.popUpAddName.value,
        link: this.data.popUpAddLink.value,
      };
      const cardElement = new card(newCard, ".card", () => {
        popupImage._handleCardClick(newCard);
      });

      cardElement._getTemplate();
      cardElement.generateNewCard();
      this.close();
    }
  };

  setEventListeners = () => {
    super.setEventListeners();
    const popupOpened = document.querySelector(".popup_opened");
    this.form = popupOpened.querySelector(".popup__container");
    this.form.addEventListener("submit", this.handleSubmit);
  };
  close() {
    super.close();
    this.form.removeEventListener("submit", this.handleSubmit);
    // remove card form
    if (this.popupSelector == ".popup_add") {
      this.popup.querySelector(".popup__input_name").value = "";
      this.popup.querySelector(".popup__input_about").value = "";
    }
  }
}
