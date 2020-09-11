import initialCards from './initial.js';
import Card from './Card.js';
import configObject from './constants.js';
import { FormValidator, ErrorsCleaner } from './FormValidator.js';

// выбор списка карточек
const elementsList = document.querySelector('.elements__list');

// добавление карточек "из коробки"
initialCards.forEach(item => {
  const card = new Card(item, '#element');
  const cardElement = card.generateCard();

  elementsList.append(cardElement);
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

const imagePopup = document.querySelector('.popup_type_image');

// функция открытия попапа с формой
function openPopup(popup) {
  popup.classList.add('popup_opened');

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

function fillImagePopup(element) {
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');

  imagePopup.querySelector('.popup__image').src = elementImage.src;
  imagePopup.querySelector('.popup__image').alt = elementTitle.textContent;
  imagePopup.querySelector('.popup__subtitle').textContent = elementTitle.textContent;
}

// добавление слушателя событий на кнопки редактирования профиля, добавления карточки
editButton.addEventListener('click', () => {
  fillEditPopup();
  openPopup(editPopup);

  const formCleaner = new ErrorsCleaner(configObject, editForm);
  formCleaner.cleanErrors();
});

addButton.addEventListener('click', () => {
  fillAddPopup();
  openPopup(addPopup);

  const formCleaner = new ErrorsCleaner(configObject, addForm);
  formCleaner.cleanErrors();
});

const elementList = Array.from(document.querySelectorAll('.element'));
elementList.forEach(element => {
  element.querySelector('.element__image').addEventListener('click', () => {
    fillImagePopup(element);
    openPopup(imagePopup);
  });
});

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.body.removeEventListener('keyup', closeByEsc);
}

// слушатели для кнопок Закрыть
const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
editPopupCloseButton.addEventListener('click', () => { closePopup(editPopup) });

const addPopupCloseButton = addPopup.querySelector('.popup__close-button');
addPopupCloseButton.addEventListener('click', () => { closePopup(addPopup) });

const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');
imagePopupCloseButton.addEventListener('click', () => { closePopup(imagePopup) });

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

  const card = new Card(item, '#element');
  const cardElement = card.generateCard();

  elementsList.prepend(cardElement);

  closePopup(addPopup);
}

// выбор форм
const editForm = document.forms['edit-form'];
const editFormValidator = new FormValidator(configObject, editForm);
editFormValidator.enableValidation();

const addForm = document.forms['add-form'];
const addFormValidator = new FormValidator(configObject, addForm);
addFormValidator.enableValidation();

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
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup };
