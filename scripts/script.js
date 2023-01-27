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
let profile = document.querySelector(".profile");
let popUp = document.querySelector(".popup");
let popUpForm = popUp.querySelector(".popup__container");
let popUpClose = document.querySelectorAll(".popup .popup__close");
let editBtn = profile.querySelector(".profile__edit-button");
let cards = document.querySelector(".cards");
let cardDelete = cards.querySelectorAll(".card .card__delete");
let cardLike = cards.querySelectorAll(".card .card__like");
let popUpAdd = document.querySelector(".popup_add");
let popUpAddForm = popUpAdd.querySelector(".popup__container");
let addBtn = profile.querySelector(".profile__add-button");

//profile value
let profileName = profile.querySelector(".profile__name");
let profileJob = profile.querySelector(".profile__job");

//input
let inputName = popUp.querySelector(".popup__input_name");
let inputJob = popUp.querySelector(".popup__input_about");

function popupOpen() {
  popUp.classList.add("popup_opened");
  let name = profileName.textContent;
  let job = profileJob.textContent;
  inputName.value = name;
  inputJob.value = job;
}
function popupClose() {
  popUp.classList.remove("popup_opened");
  popUpAdd.classList.remove("popup_opened");
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
}
function handleAddForm(evt) {
  evt.preventDefault();
}

function activeLike(cardLike) {
  cardLike.classList.add("card__like_active");
}
function deactiveLike(cardLike) {
  cardLike.classList.remove("card__like_active");
}
function addCard() {
  popUpAdd.classList.toggle("popup_opened");
}
function removeCard(parent) {
  parent.remove();
}

editBtn.addEventListener("click", function () {
  popupOpen();
});
popUpClose.forEach((e) => {
  e.addEventListener("click", () => {
    popupClose();
  });
});

popUpForm.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
  popupClose();
});

popUpAddForm.addEventListener("submit", (evt) => {
  handleAddForm(evt);
  popupClose();
});

addBtn.addEventListener("click", () => {
  addCard();
});

cardLike.forEach((c) => {
  c.addEventListener("click", function () {
    c.classList.toggle("card__like_active");
  });
});
cardDelete.forEach((c) => {
  let parent = c.parentElement;
  c.addEventListener("click", () => {
    removeCard(parent);
  });
});
