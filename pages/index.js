let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button')

function togglePopupOpened() {
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopupOpened);
closeButton.addEventListener('click', togglePopupOpened);
