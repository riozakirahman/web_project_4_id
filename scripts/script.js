//element
let profile = document.querySelector(".profile");
let popUp = document.querySelector(".popup");
let popUpForm = popUp.querySelector(".popup__container");
let popUpClose = popUp.querySelector(".popup__close");
let editBtn = profile.querySelector(".profile__edit-button");
let cards = document.querySelector(".cards");
let cardLike = cards.querySelectorAll(".card .card__like");

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
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
}

function activeLike(cardLike) {
  cardLike.classList.add("card__like_active");
}
function deactiveLike(cardLike) {
  cardLike.classList.remove("card__like_active");
}

editBtn.addEventListener("click", function () {
  popupOpen();
});
popUpClose.addEventListener("click", function () {
  popupClose();
});
popUpForm.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
  popupClose();
});
cardLike.forEach((c) => {
  c.addEventListener("click", function () {
    c.classList.toggle("card__like_active");
  });
});
