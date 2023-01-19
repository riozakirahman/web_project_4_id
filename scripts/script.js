//element
let profile = document.querySelector(".profile");
let popUp = document.querySelector(".popup");
let popUpForm = popUp.querySelector(".popup__container");
let popUp_close = popUp.querySelector(".popup__close");
let editBtn = profile.querySelector(".profile__edit-button");
let cards = document.querySelector(".cards");
let card = cards.querySelectorAll(".card");

//profile value
let profile__name = profile.querySelector(".profile__name");
let profile__job = profile.querySelector(".profile__job");

//input
let inputName = popUp.querySelector(".popup__input_name");
let inputJob = popUp.querySelector(".popup__input_about");

function popupOpen() {
  popUp.classList.add("popup_opened");
  let name = profile__name.textContent;
  let job = profile__job.textContent;
  inputName.value = name;
  inputJob.value = job;
}
function popupClose() {
  popUp.classList.remove("popup_opened");
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profile__name.textContent = inputName.value;
  profile__job.textContent = inputJob.value;
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
popUp_close.addEventListener("click", function () {
  popupClose();
});
popUpForm.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
  popupClose();
});

for (let i = 0; i < card.length; i++) {
  let cardLike = card[i].querySelector(".card__like");
  cardLike.addEventListener("click", function () {
    if (cardLike.classList.contains("card__like_active")) {
      deactiveLike();
    } else {
      activeLike();
    }
  });
}
