// массив карточек "из коробки"
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// выбор списка карточек и заготовки их верстки
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element').content;

// добавление карточек "из коробки" в список
initialCards.forEach(item => {
  const element = elementTemplate.cloneNode(true);

  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__image').alt = item.name;
  element.querySelector('.element__title').textContent = item.name;

  elementsList.append(element);
});

// выбор элементов секции profile
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

//выбор элементов блока popup
const popup = document.querySelector('.popup');
const form = popup.querySelector('.popup__container');
const closeButton = popup.querySelector('.popup__close-button');
const inputName = popup.querySelector('.popup__input_type_name');
const inputJob = popup.querySelector('.popup__input_type_job');
const inputPlace = popup.querySelector('popup__input_type_place');
const inputLink = popup.querySelector('popup__input_type_link');

// функция открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

// функция закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}

// добавление слушателя событий на кнопки редактирования профиля и закрытия попапа
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// функция-обработчик события клика на кнопку попапа Сохранить
function saveProfile (evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
}

// добавление слушателя событий на форму
form.addEventListener('submit', saveProfile);

