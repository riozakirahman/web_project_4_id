const popUp = document.querySelector(".popup");
const profile = document.querySelector(".profile");
const editBtn = profile.querySelector(".profile__edit-button");
const addBtn = profile.querySelector(".profile__add-button");

export function openPopUp(e) {
  if (e.target == editBtn) {
    //profile form
    const profileName = profile.querySelector(".profile__name");
    const profileJob = profile.querySelector(".profile__job");
    const inputName = popUp.querySelector(".popup__input_name");
    const inputJob = popUp.querySelector(".popup__input_about");
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    document.querySelector(".popup").classList.add("popup_opened");
  } else if (e.target == addBtn) {
    //add card form
    const popUpAdd = document.querySelector(".popup_add");
    const popUpAddTitle = popUpAdd.querySelector(".popup__input_name");
    const popUpAddUrl = popUpAdd.querySelector(".popup__input_about");
    popUpAddTitle.value = "";
    popUpAddUrl.value = "";
    popUpAdd.classList.add("popup_opened");
  } else if (e.target.classList == "card__background") {
    document.querySelector(".popup_detail").classList.add("popup_opened");
  }
  const popUpOpened = document.querySelector(".popup_opened");
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
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

export function closePopUp(e) {
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
