export class userInfo {
  constructor(userData) {
    this.name = userData.name;
    this.job = userData.job;
  }
  getUserInfo() {
    return {
      name: this.name,
      job: this.job,
    };
  }
  setUserInfo({ name, job }) {
    this.name = name;
    this.job = job;
  }
}
