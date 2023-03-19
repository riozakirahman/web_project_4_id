export class userInfo {
  constructor() {
    this.profileName = document.querySelector(".profile .profile__name");
    this.profileJob = document.querySelector(".profile .profile__job");
    this.popUp = document.querySelector(".popup");
    this.inputName = this.popUp.querySelector(".popup__input_name");
    this.inputJob = this.popUp.querySelector(".popup__input_about");
  }
  getUserInfo() {
    return {
      name: this.profileName.textContent,
      job: this.profileJob.textContent,
    };
  }
  setUserInfo(name, job) {
    this.inputName.value = name;
    this.inputJob.value = job;
    this.profileName.textContent = name;
    this.profileJob.textContent = job;
  }
}
