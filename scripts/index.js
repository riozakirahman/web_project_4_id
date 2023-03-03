import { card } from "./card.js";
import { openPopUp, closePopUp } from "./utils.js";
import { FormValidator } from "./FormValidator.js";

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

//profile
const profile = document.querySelector(".profile");
const popUp = document.querySelector(".popup");
const popUpForm = popUp.querySelector(".popup__container");
const editBtn = profile.querySelector(".profile__edit-button");
const addBtn = profile.querySelector(".profile__add-button");
//profile

const cards = document.querySelector(".cards");
const popUpAdd = document.querySelector(".popup_add");
const popUpAddForm = popUpAdd.querySelector(".popup__container");
const popUpAddName = popUpAddForm.querySelector(".popup__input_name-card");
const popUpAddLink = popUpAddForm.querySelector(".popup__input_link-card");

//profile value
const profileName = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__job");

//input
const inputName = popUp.querySelector(".popup__input_name");
const inputJob = popUp.querySelector(".popup__input_about");

function loadCard() {
  initialCards.forEach((data) => {
    const cardElement = new card(data, ".card");
    cardElement._getTemplate();
    cardElement.generateCard();
  });
}
//init card
loadCard();

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopUp(evt);
}
function handleAddForm(evt) {
  evt.preventDefault();
  const newCard = {
    name: popUpAddName.value,
    link: popUpAddLink.value,
  };
  const cardElement = new card(newCard, ".card");
  cardElement._getTemplate();
  cardElement.generateNewCard();
  cards.append(cardElement);
  closePopUp(evt);
}

editBtn.addEventListener("click", (e) => {
  openPopUp(e);
});

popUpForm.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
});

popUpAddForm.addEventListener("submit", (evt) => {
  handleAddForm(evt);
});

addBtn.addEventListener("click", (e) => {
  openPopUp(e);
});
