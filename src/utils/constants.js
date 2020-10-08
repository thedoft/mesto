// элементы секции profile
const profile = document.querySelector('.profile');
const avatar = profile.querySelector('.profile__avatar');
const editAvatarButton = profile.querySelector('.profile__edit-button_type_avatar');
const editProfileButton = profile.querySelector('.profile__edit-button_type_profile');
const addButton = profile.querySelector('.profile__add-button');

// селекторы данных профиля
const profileTitleSelector = '.profile__title';
const profileSubtitleSelector = '.profile__subtitle';

// селекторы попапов
const editAvatarPopupSelector = '.popup_type_edit-avatar';
const editProfilePopupSelector = '.popup_type_edit-profile';
const addPopupSelector = '.popup_type_add-card';
const imagePopupSelector = '.popup_type_image';

// выбор инпутов форм
const avatarInput = document.querySelector('.popup__input_type_avatar');
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
  avatar,
  editAvatarButton,
  editProfileButton,
  addButton,
  editAvatarPopupSelector,
  editProfilePopupSelector,
  addPopupSelector,
  imagePopupSelector,
  avatarInput,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  cardListSelector,
  cardSelector,
  configObject
};
