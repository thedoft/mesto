let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__title');
let profileJob = profile.querySelector('.profile__subtitle');
let editButton = profile.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__container');
let closeButton = popup.querySelector('.popup__close-button');
let inputName = popup.querySelector('.popup__input_type_name');
let inputJob = popup.querySelector('.popup__input_type_job');


function openPopup() {
  popup.classList.add('popup_opened');

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function saveProfile (evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup();
}

form.addEventListener('submit', saveProfile);
