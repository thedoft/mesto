let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__title');
let profileJob = profile.querySelector('.profile__subtitle');
let editButton = profile.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__container');
let closeButton = popup.querySelector('.popup__close-button');
let inputs = popup.querySelectorAll('.popup__input');

function openPopup() {
  popup.classList.add('popup_opened');

  inputs[0].value = profileName.textContent;
  inputs[1].value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function saveProfile (evt) {
  evt.preventDefault();

  profileName.textContent = inputs[0].value;
  profileJob.textContent = inputs[1].value;

  closePopup();
}

form.addEventListener('submit', saveProfile);
