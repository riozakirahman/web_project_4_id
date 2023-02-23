import { enableValidation } from "./validate.js";

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

//element
const profile = document.querySelector(".profile");
const popUp = document.querySelector(".popup");
const popUpForm = popUp.querySelector(".popup__container");
const editBtn = profile.querySelector(".profile__edit-button");
const cards = document.querySelector(".cards");
let popUpOpened;

const popUpAdd = document.querySelector(".popup_add");
const popUpAddForm = popUpAdd.querySelector(".popup__container");
const popUpAddName = popUpAddForm.querySelector(".popup__input_name-card");
const popUpAddLink = popUpAddForm.querySelector(".popup__input_link-card");
const addBtn = profile.querySelector(".profile__add-button");
const popUpDetail = document.querySelector(".popup_detail");
const popUpDetailForm = popUpDetail.querySelector(".popup__container");
const detailImg = popUpDetailForm.querySelector(".popup__img");
const detailLabel = popUpDetailForm.querySelector(".popup__label");

//profile value
const profileName = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__job");

//card value
const popUpAddTitle = popUpAdd.querySelector(".popup__input_name");
const popUpAddUrl = popUpAdd.querySelector(".popup__input_about");
//input
const inputName = popUp.querySelector(".popup__input_name");
const inputJob = popUp.querySelector(".popup__input_about");

//template
const cardTemplate = document.querySelector("#card").content;

function loadCard() {
  initialCards.forEach((data) => {
    let cardElement = createCard(data.name, data.link);
    cards.append(cardElement);
  });
}
//init card
loadCard();

function openPopUp(e) {
  if (e.target == editBtn) {
    popUp.classList.add("popup_opened");
    const name = profileName.textContent;
    const job = profileJob.textContent;
    inputName.value = name;
    inputJob.value = job;
  } else if (e.target == addBtn) {
    popUpAddTitle.value = "";
    popUpAddUrl.value = "";
    popUpAdd.classList.add("popup_opened");
  } else if (e.target.classList == "card__background") {
    popUpDetail.classList.add("popup_opened");
  }
  popUpOpened = document.querySelector(".popup_opened");
  popUpOpened.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup__close")) {
      closePopUp(e);
    } else if (e.target == popUpOpened) {
      closePopUp(e);
    }
  });
  document.addEventListener("keydown", handleKeyDown);
}
function handleKeyDown(evt) {
  if (evt.key == "Escape" || evt.key == "Esc") {
    closePopUp(evt);
    document.removeEventListener("keydown", handleKeyDown);
  }
}

function closePopUp(e) {
  let formElement;

  if (e.type == "submit" || e.type == "click") {
    if (e.target.classList.contains("popup_opened")) {
      formElement = e.target.querySelector(".popup__container");
      e.target.classList.remove("popup_opened");
    } else if (e.target.classList.contains("popup__container")) {
      formElement = e.target.closest(".popup__container");
      const parent = e.target.closest(".popup");
      parent.classList.remove("popup_opened");
    } else if (e.target.classList.contains("popup__close")) {
      formElement = e.target.closest(".popup__container");
      const popupContainer = e.target.closest(".popup__container");
      const popup = popupContainer.closest(".popup");
      if (popup) {
        popup.classList.remove("popup_opened");
      }
    }
  } else if (e.type == "keydown") {
    formElement = e.target.closest(".popup__container");
    const popUpOpened = document.querySelector(".popup_opened");
    console.log(popUpOpened);
    popUpOpened.classList.remove("popup_opened");
  }
  try {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    if (inputList) {
      inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
      });
    }
  } catch (error) {}
}
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
  const name = newCard.name;
  const link = newCard.link;
  const cardElement = createCard(name, link);
  cards.prepend(cardElement);
  popUpAddName.value = null;
  popUpAddLink.value = null;
  closePopUp(evt);
}
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__background");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteCard = cardElement.querySelector(".card__delete");
  const likeCard = cardElement.querySelector(".card__like");
  cardImage.src = link;
  cardTitle.textContent = name;
  cardElement.append(cardImage);
  cardElement.append(cardTitle);
  cardElement.append(deleteCard);
  cardElement.append(likeCard);

  cardElement.addEventListener("click", (e) => {
    if (e.target == deleteCard) {
      handleDeleteCard(e);
    } else if (e.target == likeCard) {
      activeLike(e);
    } else if (e.target == cardImage) {
      handleCardImage(name, link, e);
    }
  });

  return cardElement;
}

function activeLike(e) {
  e.target.classList.toggle("card__like_active");
}
function handleDeleteCard(e) {
  let parent = e.target.closest(".card");
  parent.remove();
}

function handleCardImage(name, link, e) {
  detailLabel.textContent = name;
  detailImg.src = link;
  openPopUp(e);
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

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

enableValidation({
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});
