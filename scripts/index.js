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

// выбор списка карточек, самой карточки и заготовки ее верстки
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element').content;

// добавление карточек "из коробки" в список
initialCards.forEach(item => {
  const element = elementTemplate.cloneNode(true);

  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__image').alt = item.name;
  element.querySelector('.element__title').textContent = item.name;

  // выбор кнопки like, функция, делающая ее активной/неактивной при нажатии и добавление функции кнопке
  const likeButton = element.querySelector('.element__like-button');

  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  elementsList.append(element);
});

// выбор элементов секции profile
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

// выбор заготовки верстки попапа, создание двух попапов с формой и добавление их в DOM
const page = document.querySelector('.page');
const popupTemplate = document.querySelector('#popup').content;

const editPopup = popupTemplate.cloneNode(true);
editPopup.querySelector('.popup__title').textContent = 'Редактирование профиля';
editPopup.querySelector('.popup__save-button').textContent = 'Сохранить';

const addPopup = popupTemplate.cloneNode(true);
addPopup.querySelector('.popup__title').textContent = 'Новое место';
addPopup.querySelector('.popup__save-button').textContent = 'Создать';
addPopup.querySelectorAll('.popup__input')[0].placeholder = 'Название';
addPopup.querySelectorAll('.popup__input')[1].placeholder = 'Ссылка на картинку';

page.after(editPopup, addPopup);
const popup = document.querySelectorAll('.popup');

// функции открытия попапа
function openEditPopup() {
  popup[0].classList.add('popup_opened');

  popup[0].querySelectorAll('.popup__input')[0].value = profileName.textContent;
  popup[0].querySelectorAll('.popup__input')[1].value = profileJob.textContent;
};

function openAddPopup() {
  popup[1].classList.add('popup_opened');
};

// функция закрытия попапа
function closePopup() {
  popup.forEach(item => {
    item.classList.remove('popup_opened')});
};

// добавление слушателя событий на кнопки редактирования профиля, добавления карточки и закрытия попапа
editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);

const closeButton = document.querySelectorAll('.popup__close-button');
closeButton.forEach(item => {
  item.addEventListener('click', closePopup)});

// выбор форм
const form = document.querySelectorAll('.popup__container');

// функция-обработчик события клика на кнопку попапа Сохранить
function saveProfile (evt) {
  evt.preventDefault();

  profileName.textContent = popup[0].querySelectorAll('.popup__input')[0].value;
  profileJob.textContent = popup[0].querySelectorAll('.popup__input')[1].value;

  closePopup();
};

// функция-обработчик события клика на кнопку попапа Создать
function addCard (evt) {
  evt.preventDefault();



  closePopup();
};

// добавление слушателей событий на формы
form[0].addEventListener('submit', saveProfile);
form[1].addEventListener('submit', addCard);
