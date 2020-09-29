// выбор элементов секции profile
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

// выбор инпутов форм
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');

// объект со свойствами для валидации форм
const configObject = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export { editButton, addButton, nameInput, jobInput, placeInput, linkInput, configObject };
