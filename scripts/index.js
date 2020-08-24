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

// выбор списка карточек и заготовки верстки карточки
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element').content;

// функция добавления карточки
function newCard(item) {
  const element = elementTemplate.cloneNode(true);

  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');

  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementTitle.textContent = item.name;

  // выбор кнопки like и добавление кнопке обработчика событий, делающего ее активной/неактивной при нажатии
  const likeButton = element.querySelector('.element__like-button');
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  // попап с картинкой и обработчик для него
  const elementPopup = element.querySelector('.popup_type_image');
  elementPopup.querySelector('.popup__image').src = elementImage.src;
  elementPopup.querySelector('.popup__image').alt = elementImage.alt;
  elementPopup.querySelector('.popup__subtitle').textContent = elementTitle.textContent;
  elementImage.addEventListener('click', () => {
    elementPopup.classList.add('popup_opened');
  });

  // выбор кнопки удаления карточки и обработчик события для нее
  const trashButton = element.querySelector('.element__trash-button');
  trashButton.addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
    elementPopup.remove();
  });

  return element;
}

// добавление карточек "из коробки"
initialCards.forEach(item => {
  elementsList.append(newCard(item));
});

// выбор элементов секции profile
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileJob = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

// выбор заготовки верстки попапа, создание двух попапов с формой и добавление их в DOM
const page = document.querySelector('.page');
const popupTemplate = document.querySelector('#form-popup').content;

const editPopupElement = popupTemplate.cloneNode(true);
editPopupElement.querySelector('.popup__title').textContent = 'Редактирование профиля';
editPopupElement.querySelector('.popup__submit-button').textContent = 'Сохранить';

const addPopupElement = popupTemplate.cloneNode(true);
addPopupElement.querySelector('.popup__title').textContent = 'Новое место';
addPopupElement.querySelector('.popup__submit-button').textContent = 'Создать';
addPopupElement.querySelectorAll('.popup__input')[0].placeholder = 'Название';
addPopupElement.querySelectorAll('.popup__input')[1].placeholder = 'Ссылка на картинку';

page.after(editPopupElement, addPopupElement);

// запись попапов в отдельные переменные
const popup = document.querySelectorAll('.popup');
const formPopup = document.querySelectorAll('.popup_type_form');
const editPopup = formPopup[0];
const addPopup = formPopup[1];

// функции открытия попапа
function openEditPopup() {
  editPopup.classList.add('popup_opened');

  editPopup.querySelectorAll('.popup__input')[0].value = profileName.textContent;
  editPopup.querySelectorAll('.popup__input')[1].value = profileJob.textContent;
};

function openAddPopup() {
  addPopup.classList.add('popup_opened');

  addPopup.querySelectorAll('.popup__input')[0].value = '';
  addPopup.querySelectorAll('.popup__input')[1].value = '';
};

// добавление слушателя событий на кнопки редактирования профиля, добавления карточки
editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);

// функция закрытия попапа и слушатель для кнопки закрыть
function closePopup() {
  popup.forEach(item => {
    item.classList.remove('popup_opened');
  });
};

const closeButton = document.querySelectorAll('.popup__close-button');
closeButton.forEach(item => {
  item.addEventListener('click', closePopup);
});

// функция-обработчик события клика на кнопку попапа Сохранить
function saveProfile (evt) {
  evt.preventDefault();

  profileName.textContent = editPopup.querySelectorAll('.popup__input')[0].value;
  profileJob.textContent = editPopup.querySelectorAll('.popup__input')[1].value;

  closePopup();
};

// функция-обработчик события клика на кнопку попапа Создать
function addCard (evt) {
  evt.preventDefault();

  let item = {
    name: addPopup.querySelectorAll('.popup__input')[0].value,
    link: addPopup.querySelectorAll('.popup__input')[1].value
  };

  if ((item.name !== '') && (item.link !== '')) {
    elementsList.prepend(newCard(item));
  };

  closePopup();
};

// выбор форм
const form = document.querySelectorAll('.popup__form');
const editForm = form[0];
const addForm = form[1];

// добавление слушателей событий на формы
editForm.addEventListener('submit', saveProfile);
addForm.addEventListener('submit', addCard);
