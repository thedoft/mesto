// элементы секции profile
const profile = document.querySelector('.profile');
const editAvatarButton = profile.querySelector('.profile__edit-button_type_avatar');
const editProfileButton = profile.querySelector('.profile__edit-button_type_profile');
const addCardButton = profile.querySelector('.profile__add-button');

// селекторы данных профиля
const profileAvatarSelector = '.profile__avatar';
const profileTitleSelector = '.profile__title';
const profileSubtitleSelector = '.profile__subtitle';

// селекторы попапов
const confirmPopupSelector = '.popup_type_confirm';
const editAvatarPopupSelector = '.popup_type_edit-avatar';
const editProfilePopupSelector = '.popup_type_edit-profile';
const addCardPopupSelector = '.popup_type_add-card';
const imagePopupSelector = '.popup_type_image';

// выбор попапов
const editAvatarPopup = document.querySelector(editAvatarPopupSelector);
const editProfilePopup = document.querySelector(editProfilePopupSelector);
const addCardPopup = document.querySelector(addCardPopupSelector);

// выбор кнопок сохранения попапов
const editAvatarSubmitButton = editAvatarPopup.querySelector('.popup__submit-button');
const editProfileSubmitButton = editProfilePopup.querySelector('.popup__submit-button');
const addCardSubmitButton = addCardPopup.querySelector('.popup__submit-button');

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
  profileAvatarSelector,
  profileTitleSelector,
  profileSubtitleSelector,
  editAvatarButton,
  editProfileButton,
  addCardButton,
  confirmPopupSelector,
  editAvatarPopupSelector,
  editProfilePopupSelector,
  addCardPopupSelector,
  imagePopupSelector,
  editAvatarSubmitButton,
  editProfileSubmitButton,
  addCardSubmitButton,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  cardListSelector,
  cardSelector,
  configObject
};
