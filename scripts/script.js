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

const cardTemplate = document.querySelector("#card").content;
const cardDetailSection = document.querySelector(".card-detail-section");
const detailTemplate = document.querySelector("#card-detail").content;

function card() {
  initialCards.forEach((data) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardImage = cardElement.querySelector(".card__background");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteCard = cardElement.querySelector(".card__delete");
    const likeCard = cardElement.querySelector(".card__like");
    cardImage.src = data.link;
    cardTitle.textContent = data.name;
    cardElement.append(cardImage);
    cardElement.append(cardTitle);
    cardElement.append(deleteCard);
    cardElement.append(likeCard);
    cards.append(cardElement);

    cardImage.addEventListener("click", () => {
      console.log("klik");
      const detailElement = detailTemplate
        .querySelector(".card-detail")
        .cloneNode(true);
      const detailContainer = detailElement.querySelector(
        ".card-detail__container"
      );
      const detailImg = detailElement.querySelector(".card-detail__img");
      detailImg.src = data.link;
      const detailLabel = detailElement.querySelector(".card-detail__label");
      const closeBtn = detailElement.querySelector(".popup__close_card-detail");
      detailLabel.textContent = data.name;
      closeBtn.addEventListener("click", () => {
        detailElement.remove();
      });
      detailContainer.append(detailImg);
      detailContainer.append(detailLabel);
      detailContainer.append(closeBtn);
      detailElement.append(detailContainer);
      cardDetailSection.append(detailElement);
      window.scrollTo(0, 0);
    });

    deleteCard.addEventListener("click", (e) => {
      let parent = e.target.parentElement;
      parent.remove();
    });
    likeCard.addEventListener("click", (e) => {
      e.target.classList.toggle("card__like_active");
    });
  });
}
//init card
card();
const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

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

function addCard() {
  popUpAdd.classList.toggle("popup_opened");
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
