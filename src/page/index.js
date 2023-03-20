import { Card } from "../components/card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/popupwithform.js";
import PopupWithImage from "../components/popupwithimage.js";
import { userInfo } from "../components/userInfo.js";
import { Section } from "../components/section.js";
import "../page/index.css";

//card data
const initialCards = [
  {
    name: "Lembah Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Danau Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Pegunungan Gundul",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Gunung Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Taman Nasional Vanoise",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const profile = document.querySelector(".profile");
const editBtn = profile.querySelector(".profile__edit-button");
const addBtn = profile.querySelector(".profile__add-button");

function loadCard(data) {
  const popupImage = new PopupWithImage(".popup_detail", true);
  popupImage.setEventListeners();
  const cardElement = new Card(data, ".card", () => {
    popupImage.open(data);
  });
  cardElement.getTemplate();
  cardElement.generateCard();
  return cardElement.element;
}

const renderCard = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      return loadCard(cardData);
    },
  },
  ".cards"
);

renderCard.renderer();

//Validation
const selector = {
  formSelector: ".popup__container",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input_type_error",
  submitButtonSelector: ".popup__save",
  errorClass: "popup__input-error_active",
};
const data = {
  inputSelector: ".popup__input",
};
const validation = new FormValidator(selector, data);
validation.enableValidation();

//handle form profile
function handleFormProfile() {
  const popup = new PopupWithForm(".popup");
  const user = new userInfo();
  user.setUserInfo(popup._getInputValues().name, popup._getInputValues().job);
  document.querySelector(popup.popupSelector).classList.remove("popup_opened");
}
function handleFormCard() {
  const popupImage = new PopupWithImage(".popup_detail");
  const popup = new PopupWithForm(".popup_add");
  const newCard = {
    name: popup._getInputValues().name,
    link: popup._getInputValues().link,
  };
  const renderCard = new Section(
    {
      items: newCard,
      renderer: () => {
        const cardElement = new Card(newCard, ".card", () => {
          popupImage.open(newCard);
        });

        cardElement.getTemplate();
        cardElement.generateCard();
        return cardElement.element;
      },
    },
    ".cards"
  );
  renderCard.renderer(true);
  document.querySelector(popup.popupSelector).classList.remove("popup_opened");
  popup.popup.querySelector(".popup__container").reset();
}

editBtn.addEventListener("click", () => {
  const userData = new userInfo();
  const data = {
    name: userData.getUserInfo().name,
    job: userData.getUserInfo().job,
  };

  const form = new PopupWithForm(".popup", () => {
    handleFormProfile();
  });
  const user = new userInfo();
  user.setUserInfo(data.name, data.job);
  form.setEventListeners();
});

addBtn.addEventListener("click", () => {
  const form = new PopupWithForm(".popup_add", () => {
    handleFormCard();
  });
  form.setEventListeners();
});
