// элементы секции profile
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

// селекторы данных профиля
const profileTitleSelector = '.profile__title';
const profileSubtitleSelector = '.profile__subtitle';

// селекторы спопапов
const imagePopupSelector = '.popup_type_image';
const editPopupSelector = '.popup_type_edit-profile';
const addPopupSelector = '.popup_type_add-card';

// выбор инпутов форм
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');

// селекторы списка карточек и элемента карточки
const cardListSelector = '.elements__list';
const cardSelector = '#element';

// объект со свойствами для валидации форм
const configObject = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export {
  profileTitleSelector,
  profileSubtitleSelector,
  editButton,
  addButton,
  imagePopupSelector,
  editPopupSelector,
  addPopupSelector,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  cardListSelector,
  cardSelector,
  configObject
};
