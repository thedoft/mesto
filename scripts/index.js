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

// выбор попапа картинки и его элементов
const elementPopup = document.querySelector('.popup_type_image');
const elementPopupImage = elementPopup.querySelector('.popup__image');
const elementPopupSubtitle = elementPopup.querySelector('.popup__subtitle');
const elementPopupCloseButton = elementPopup.querySelector('.popup__close-button');

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

  // обработчик для попапа с картинкой
  elementImage.addEventListener('click', () => {
    elementPopupImage.src = elementImage.src;
    elementPopupImage.alt = elementImage.alt;
    elementPopupSubtitle.textContent = elementTitle.textContent;

    elementPopup.classList.add('popup_opened');

    // добавление слушателя для закрытия попапа нажатием на Esc
    document.body.addEventListener('keyup', closeByEsc);
  });


  // слушатель для кнопки Закрыть попапа с картинкой
  elementPopupCloseButton.addEventListener('click', closePopup);

  // выбор кнопки удаления карточки и обработчик события для нее
  const trashButton = element.querySelector('.element__trash-button');
  trashButton.addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
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
const editPopup = document.querySelector('.popup_type_edit-profile');
const editPopupName = editPopup.querySelector('.popup__input_type_name');
const editPopupJob = editPopup.querySelector('.popup__input_type_job');

const addPopup = document.querySelector('.popup_type_add-card');
const addPopupPlace = addPopup.querySelector('.popup__input_type_place');
const addPopupLink = addPopup.querySelector('.popup__input_type_link');

// функция открытия попапа с формой
function openPopup(popup) {
  return function () {
    if (popup === editPopup) {
      editPopupName.value = profileName.textContent;
      editPopupJob.value = profileJob.textContent;
    } else if (popup === addPopup) {
      addPopupPlace.value = '';
      addPopupLink.value = '';
    }
    popup.classList.add('popup_opened');

    // добавление слушателя для закрытия попапа нажатием на Esc
    document.body.addEventListener('keyup', closeByEsc);
  }
}

// добавление слушателя событий на кнопки редактирования профиля, добавления карточки
editButton.addEventListener('click', openPopup(editPopup));
addButton.addEventListener('click', openPopup(addPopup));

// функция закрытия попапа и слушатели для кнопок Закрыть
function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
  document.body.removeEventListener('keyup', closeByEsc);
}

const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
editPopupCloseButton.addEventListener('click', closePopup);

const addPopupCloseButton = addPopup.querySelector('.popup__close-button');
addPopupCloseButton.addEventListener('click', closePopup);

// функция-обработчик события клика на кнопку попапа Сохранить
function saveProfile(evt) {
  evt.preventDefault();

  profileName.textContent = editPopupName.value;
  profileJob.textContent = editPopupJob.value;

  closePopup(evt);
}

// функция-обработчик события клика на кнопку попапа Создать
function addCard(evt) {
  evt.preventDefault();

  const item = {
    name: addPopupPlace.value,
    link: addPopupLink.value
  };

  if ((item.name !== '') && (item.link !== '')) {
    elementsList.prepend(newCard(item));
  }

  closePopup(evt);
}

// выбор форм
const editForm = document.forms['edit-form'];
const addForm = document.forms['add-form'];

// добавление слушателей событий на формы
editForm.addEventListener('submit', saveProfile);
addForm.addEventListener('submit', addCard);

// выберем все попапы и добавим им возможность закрытия кликом на оверлей
const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      closePopup(evt);
    }
  });
});

// функция закрытия попапа нажатием на Esc и удаление слушателя после закрытия
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
  document.body.removeEventListener('keyup', closeByEsc);
}
