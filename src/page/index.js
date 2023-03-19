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
const logo = new URL("../images/header__logo.png", import.meta.url);
const avatar = new URL("../images/profile__avatar.jpg", import.meta.url);
const headerLogo = document.querySelector("#header__logo");
headerLogo.src = logo;
const profileAva = document.querySelector("#profile-picture");
profileAva.src = avatar;
const profile = document.querySelector(".profile");
const popUp = document.querySelector(".popup");
const editBtn = profile.querySelector(".profile__edit-button");
const addBtn = profile.querySelector(".profile__add-button");
//profile

const cards = document.querySelector(".cards");
const popUpAdd = document.querySelector(".popup_add");
const popUpAddForm = popUpAdd.querySelector(".popup__container");
const popUpAddName = popUpAddForm.querySelector(".popup__input_name-card");
const popUpAddLink = popUpAddForm.querySelector(".popup__input_link-card");

//profile value

//input
const inputName = popUp.querySelector(".popup__input_name");
const inputJob = popUp.querySelector(".popup__input_about");

function loadCard(data) {
  const popupImage = new PopupWithImage(".popup_detail");
  const cardElement = new Card(data, ".card", () => {
    popupImage._handleCardClick(data);
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

const newCardData = {
  popUpAddName,
  popUpAddLink,
};

editBtn.addEventListener("click", () => {
  const userData = new userInfo();
  const name = userData.getUserInfo().name;
  const job = userData.getUserInfo().job;
  const data = {
    name,
    job,
  };
  const form = new PopupWithForm(".popup", data);
  form.setEventListeners();
});

addBtn.addEventListener("click", (e) => {
  const form = new PopupWithForm(".popup_add", newCardData);
  form.setEventListeners();
});
