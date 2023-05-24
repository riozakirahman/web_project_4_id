import { Card } from "../components/card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/popupwithform.js";
import PopupWithImage from "../components/popupwithimage.js";
import { userInfo } from "../components/userInfo.js";
import { Section } from "../components/section.js";
import { Api } from "../components/api.js";
import "../page/index.css";
import Popup from "../components/popup.js";

// element
const profile = document.querySelector(".profile");
const editBtn = profile.querySelector(".profile__edit-button");
const addBtn = profile.querySelector(".profile__add-button");
const profilePic = profile.querySelector(".profile__avatar-img");

// api
const api = new Api({
  url: "https://around.nomoreparties.co/v1/web_idn_02",
  headers: {
    authorization: "be38ac6e-5f9c-4992-8fe7-9ac1af36b591",
    "Content-Type": "application/json",
  },
});

const fetchData = async () => {
  api
    .getUser()
    .then((userData) => {
      const user = new userInfo();
      user.setInitialInfo(userData.name, userData.about, userData._id);
      profilePic.src = userData.avatar;
      return user.getUserInfo().id;
    })
    .then((user_id) => {
      renderCard(user_id);

      addBtn.addEventListener("click", () => {
        const form = new PopupWithForm(".popup_add", () => {
          handleFormCard(user_id);
        });
        form.setEventListeners();
      });
    })
    .catch((err) => console.log(err));
};
fetchData();

const renderCard = (user_id) => {
  api
    .getCard()
    .then((res) => {
      const initialCards = res;
      const renderCard = new Section(
        {
          items: initialCards,
          renderer: (cardData) => {
            return loadCard(cardData, user_id);
          },
        },
        ".cards"
      );
      renderCard.renderer();
    })
    .catch((err) => console.log(err));
};

function loadCard(data, user_id) {
  const popupImage = new PopupWithImage(".popup_detail", true);
  const popup = new Popup(".popup_delete");
  popupImage.setEventListeners();

  const cardElement = new Card(
    data,
    ".card",
    () => {
      popupImage.open(data);
    },
    () => {
      popup.open();
      popup.close();
    },
    api,
    user_id
  );

  cardElement.getTemplate();
  cardElement.generateCard();
  return cardElement.element;
}

//Form Validation
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

//handle form
function handleFormProfile() {
  const popup = new PopupWithForm(".popup");
  const user = new userInfo();

  const popupElm = document.querySelector(".popup .popup__container");
  const popupSave = popupElm.querySelector(".popup__save");
  popupSave.textContent = "Saving..";
  api
    .editProfile(popup._getInputValues().name, popup._getInputValues().job)
    .then((res) => {
      user.setUserInfo(res.name, res.about);
      popupSave.textContent = "Submit";
    })
    .catch((err) => console.log(err));

  document.querySelector(popup.popupSelector).classList.remove("popup_opened");
}
function handleProfilePic(element) {
  const popup = new PopupWithForm(".popup_profile");
  const linkAvatar = popup._getInputValues().link;

  //set avatar to element
  api
    .editImageProfile(linkAvatar)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((result) => {
      element.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    });

  const popupProfile = document.querySelector(popup.popupSelector);
  popupProfile.classList.remove("popup_opened");
}

function handleFormCard(user_id) {
  const popupImage = new PopupWithImage(".popup_detail");
  const popup = new PopupWithForm(".popup_add");
  const popupDelete = new Popup(".popup_delete");
  const newCard = {
    name: popup._getInputValues().name,
    link: popup._getInputValues().link,
  };
  const popupElm = document.querySelector(".popup_add .popup__container");
  const popupSave = popupElm.querySelector(".popup__save");
  popupSave.textContent = "Saving..";
  const api = new Api({
    url: "https://around.nomoreparties.co/v1/web_idn_02",
    headers: {
      authorization: "be38ac6e-5f9c-4992-8fe7-9ac1af36b591",
      "Content-Type": "application/json",
    },
  });

  api.createCard(newCard.name, newCard.link).then((card) => {
    const renderCard = new Section(
      {
        items: card,
        renderer: () => {
          const cardElement = new Card(
            card,
            ".card",
            () => {
              popupImage.open(card);
            },
            () => {
              popupDelete.open();
              popupDelete.close();
            },
            api,
            user_id
          );

          cardElement.getTemplate();
          cardElement.generateCard();
          return cardElement.element;
        },
      },
      ".cards"
    );
    renderCard.renderer(true);
    document
      .querySelector(popup.popupSelector)
      .classList.remove("popup_opened");
    popup.popup.querySelector(".popup__container").reset();
    popupSave.textContent = "Buat";
  });
}

// Event Listener

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

profilePic.addEventListener("click", (e) => {
  const form = new PopupWithForm(".popup_profile", () => {
    handleProfilePic(e.target);
  });
  form.setEventListeners();
});
