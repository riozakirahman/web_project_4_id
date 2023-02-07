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
const popUpClose = document.querySelector(".popup__close");
const editBtn = profile.querySelector(".profile__edit-button");
const cards = document.querySelector(".cards");
let popUpOpened;
// document.querySelector(".popup_opened");
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
let profileName = profile.querySelector(".profile__name");
let profileJob = profile.querySelector(".profile__job");

//input
let inputName = popUp.querySelector(".popup__input_name");
let inputJob = popUp.querySelector(".popup__input_about");

//template
const cardTemplate = document.querySelector("#card").content;
// const cardDetailSection = document.querySelector(".card-detail-section");
// const detailTemplate = document.querySelector("#card-detail").content;
// let detailElement = detailTemplate
//   .querySelector(".card-detail")
//   .cloneNode(true);

function loadCard() {
  initialCards.forEach((data) => {
    let cardElement = createCard(data.name, data.link);
    cards.append(cardElement);
  });
}
//init card
loadCard();

// function loadCardDetail() {
//   const detailContainer = detailElement.querySelector(
//     ".card-detail__container"
//   );
//   detailImg = detailElement.querySelector(".card-detail__img");
//   detailLabel = detailElement.querySelector(".card-detail__label");
//   const closeBtn = detailElement.querySelector(".popup__close");
//   closeBtn.addEventListener("click", (e) => {
//     closePopUp(e);
//   });
//   detailContainer.append(detailImg);
//   detailContainer.append(detailLabel);
//   detailContainer.append(closeBtn);
//   detailElement.append(detailContainer);
//   cardDetailSection.append(detailElement);
// }
//init card-detail
// loadCardDetail();

function OpenPopUp(e) {
  if (e.target == editBtn) {
    popUp.classList.add("popup_opened");
    let name = profileName.textContent;
    let job = profileJob.textContent;
    inputName.value = name;
    inputJob.value = job;
  } else if (e.target == addBtn) {
    popUpAdd.classList.add("popup_opened");
  } else if (e.target.classList == "card__background") {
    popUpDetail.classList.add("popup_opened");
  }
  popUpOpened = document.querySelector(".popup_opened");
  popUpOpened.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup__close")) {
      closePopUp(e);
    }
  });
}
function closePopUp(e) {
  const element = e.target;
  const popupContainer = element.closest(".popup__container");
  const popup = popupContainer.closest(".popup");
  if (popup) {
    popup.classList.remove("popup_opened");
  }
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
  OpenPopUp(e);
  // detailElement.classList.add("card-detail_active");
}

editBtn.addEventListener("click", (e) => {
  OpenPopUp(e);
});

popUpForm.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
});

popUpAddForm.addEventListener("submit", (evt) => {
  handleAddForm(evt);
});

addBtn.addEventListener("click", (e) => {
  OpenPopUp(e);
});
