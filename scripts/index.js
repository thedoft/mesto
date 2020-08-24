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
  const elementPopupImage = elementPopup.querySelector('.popup__image');
  const elementPopupSubtitle = elementPopup.querySelector('.popup__subtitle');
  const elementPopupCloseButton = elementPopup.querySelector('.popup__close-button');

  elementImage.addEventListener('click', () => {
    elementPopupImage.src = elementImage.src;
    elementPopupImage.alt = elementImage.alt;
    elementPopupSubtitle.textContent = elementTitle.textContent;

    elementPopup.classList.add('popup_opened');
  });

  // слушатель для кнопки Закрыть попапа с картинкой
  elementPopupCloseButton.addEventListener('click', closePopup);

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

// запись попапов в отдельные переменные
const popup = document.querySelectorAll('.popup');

const editPopup = document.querySelector('.popup_type_edit-profile');
const editPopupName = editPopup.querySelector('.popup__input_type_name');
const editPopupJob = editPopup.querySelector('.popup__input_type_job');

const addPopup = document.querySelector('.popup_type_add-card');
const addPopupPlace = addPopup.querySelector('.popup__input_type_place');
const addPopupLink = addPopup.querySelector('.popup__input_type_link');

// функция открытия попапа с формой
function openPopup(popup) {
  return function () {
    popup.classList.add('popup_opened');

    if (popup === editPopup) {
      editPopupName.value = profileName.textContent;
      editPopupJob.value = profileJob.textContent;
    } else if (popup === addPopup) {
      addPopupPlace.value = '';
      addPopupLink.value = '';
    };
  };
};

// добавление слушателя событий на кнопки редактирования профиля, добавления карточки
editButton.addEventListener('click', openPopup(editPopup));
addButton.addEventListener('click', openPopup(addPopup));

// функция закрытия попапа и слушатели для кнопок Закрыть
function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
};

const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
editPopupCloseButton.addEventListener('click', closePopup);

const addPopupCloseButton = addPopup.querySelector('.popup__close-button');
addPopupCloseButton.addEventListener('click', closePopup);

// функция-обработчик события клика на кнопку попапа Сохранить
function saveProfile (evt) {
  evt.preventDefault();

  profileName.textContent = editPopupName.value;
  profileJob.textContent = editPopupJob.value;

  closePopup();
};

// функция-обработчик события клика на кнопку попапа Создать
function addCard (evt) {
  evt.preventDefault();

  const item = {
    name: addPopupPlace.value,
    link: addPopupLink.value
  };

  if ((item.name !== '') && (item.link !== '')) {
    elementsList.prepend(newCard(item));
  };

  closePopup();
};

// выбор форм
const editForm = editPopup.querySelector('form[name=form]');
const addForm = addPopup.querySelector('form[name=form]');

// добавление слушателей событий на формы
editForm.addEventListener('submit', saveProfile);
addForm.addEventListener('submit', addCard);
