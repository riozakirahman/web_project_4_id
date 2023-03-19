import Popup from "./popup.js";
import { Card } from "./card.js";
import PopupWithImage from "./popupwithimage.js";
import { userInfo } from "./userInfo.js";
import { Section } from "./section.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this.data = data;
    this.popup = document.querySelector(this.popupSelector);
    this.popupForm = this.popup.querySelector(".popup__container");
  }
  _getInputValues = () => {
    const userData = new userInfo();
    const name = userData.inputName.value;
    const job = userData.inputJob.value;
    return {
      name,
      job,
    };
  };

  setEventListeners = () => {
    super.setEventListeners();

    if (this.popupSelector == ".popup") {
      const userData = new userInfo();
      userData.setUserInfo(this.data.name, this.data.job);
    }

    const handleSubmit = (evt) => {
      evt.preventDefault();
      if (this.popupSelector == ".popup") {
        const user = new userInfo();
        user.setUserInfo(
          this._getInputValues().name,
          this._getInputValues().job
        );
        document
          .querySelector(this.popupSelector)
          .classList.remove("popup_opened");
      } else if (this.popupSelector == ".popup_add") {
        const newCard = {
          name: this.data.popUpAddName.value,
          link: this.data.popUpAddLink.value,
        };
        const renderCard = new Section(
          {
            items: newCard,
            renderer: (cardData) => {
              const popupImage = new PopupWithImage(".popup_detail");

              const cardElement = new Card(newCard, ".card", () => {
                popupImage._handleCardClick(newCard);
              });

              cardElement.getTemplate();
              cardElement.generateCard();
              return cardElement.element;
            },
          },
          ".cards"
        );

        renderCard.renderer(true);
        document
          .querySelector(this.popupSelector)
          .classList.remove("popup_opened");
        this.popupForm.reset();
      }

      this.popupForm.removeEventListener("submit", handleSubmit);
    };

    this.popupForm.addEventListener("submit", handleSubmit);
  };
  close() {
    super.close();
  }
}
