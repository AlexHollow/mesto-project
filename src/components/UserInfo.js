export class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent
    }
  }

  setUserInfo(userName, userDescription) {
    this._userName.textContent = userName;
    this._userDescription.textContent = userDescription;
  }

  setAvatar(link) {
    this._userAvatar.src = link;
  }
}