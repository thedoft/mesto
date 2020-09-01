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

  // обработчик для попапа с картинкой - заполнение полей
  elementImage.addEventListener('click', () => {
    elementPopupImage.src = elementImage.src;
    elementPopupImage.alt = elementImage.alt;
    elementPopupSubtitle.textContent = elementTitle.textContent;
  });

  // обработчик открытия попапа
  elementImage.addEventListener('click', () => { openPopup(elementPopup) });

  // слушатель для кнопки Закрыть попапа с картинкой
  elementPopupCloseButton.addEventListener('click', () => { closePopup(elementPopup) });

  // выбор кнопки удаления карточки и обработчик события для нее
  const trashButton = element.querySelector('.element__trash-button');
  trashButton.addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });

  return element;
}

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
  popup.classList.add('popup_opened');

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });

  // добавление слушателя для закрытия попапа нажатием на Esc
  document.body.addEventListener('keyup', closeByEsc);
}

function fillEditPopup() {
  editPopupName.value = profileName.textContent;
  editPopupJob.value = profileJob.textContent;
}

function fillAddPopup() {
  addPopupPlace.value = '';
  addPopupLink.value = '';
}

// добавление слушателя событий на кнопки редактирования профиля, добавления карточки
editButton.addEventListener('click', fillEditPopup);
editButton.addEventListener('click', () => { openPopup(editPopup); });
addButton.addEventListener('click', fillAddPopup);
addButton.addEventListener('click', () => { openPopup(addPopup); });

// функция закрытия попапа и слушатели для кнопок Закрыть
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.body.removeEventListener('keyup', closeByEsc);
}

const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
editPopupCloseButton.addEventListener('click', () => { closePopup(editPopup) });

const addPopupCloseButton = addPopup.querySelector('.popup__close-button');
addPopupCloseButton.addEventListener('click', () => { closePopup(addPopup) });

// функция-обработчик события клика на кнопку попапа Сохранить
function saveProfile() {
  profileName.textContent = editPopupName.value;
  profileJob.textContent = editPopupJob.value;

  closePopup(editPopup);
}

// функция-обработчик события клика на кнопку попапа Создать
function addCard() {
  const item = {
    name: addPopupPlace.value,
    link: addPopupLink.value
  };
  elementsList.prepend(newCard(item));

  closePopup(addPopup);
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
  popup.addEventListener('mousedown', evt => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

// функция закрытия попапа нажатием на Esc и удаление слушателя после закрытия
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    document.body.removeEventListener('keyup', closeByEsc);
  }
}
