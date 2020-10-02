import './index.css';
import {
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
} from '../utils/constants.js';
import initialCards from '../utils/initial.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';

const imagePopup = new PopupWithImage({ popupSelector: imagePopupSelector });
imagePopup.setEventListeners();

// функциональное выражение для создания карточки
const newCard = ({ place, link }) => {
  const card = new Card({
    place,
    link,
    cardSelector,
    handleCardClick: () => {
      imagePopup.open({ place, link });
    }
  });
  const cardElement = card.generateCard();

  cardList.addItem(cardElement);
}

// создание секции с карточками и наполнение ее карточками "из коробки"
const cardList = new Section({
  items: initialCards,
  renderer: ({ place, link }) => {
    newCard({ place, link });
   }
}, cardListSelector);

// отрисовка дефолтных карточек
cardList.renderItems();

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle'
});

//создание классов для попапов с формами
const editPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  handleFormSubmit: (inputsValues) => {
    userInfo.setUserInfo({
      name: inputsValues['name-input'],
      job: inputsValues['job-input']
    });
    editPopup.close();
  }
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm({
  popupSelector: addPopupSelector,
  handleFormSubmit: (inputsValues) => {
    newCard({
      place: inputsValues['place-input'],
      link: inputsValues['link-input'],
    });
    addPopup.close();
  }
});
addPopup.setEventListeners();

// выбор форм и добавление им валидаторов
const editForm = document.forms['edit-form'];
const editFormValidator = new FormValidator(configObject, editForm);
editFormValidator.enableValidation();

const addForm = document.forms['add-form'];
const addFormValidator = new FormValidator(configObject, addForm);
addFormValidator.enableValidation();

// слушатели для кнопок редактирования профиля и добавления карточки
editButton.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo();

  nameInput.value = profileData.name;
  jobInput.value = profileData.job;

  editFormValidator.cleanErrors();
  editPopup.open();
});

addButton.addEventListener('click', () => {
  placeInput.value = '';
  linkInput.value = '';

  addFormValidator.cleanErrors();
  addPopup.open();
});
