import './index.css';
import {
  editButton,
  addButton,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  configObject
} from '../utils/constants.js';
import initialCards from '../utils/initial.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';

const imagePopup = new PopupWithImage({ popupSelector: '.popup_type_image' });
imagePopup.setEventListeners();

// создание секции с карточками и наполнение ее карточками "из коробки"
const cardList = new Section({
  items: initialCards,
  renderer: ({ place, link }) => {
    const card = new Card({
      place,
      link,
      cardSelector: '#element',
      handleCardClick: () => {
        imagePopup.open({ place, link });
      }
    });
    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  }
}, '.elements__list');

// отрисовка дефолтных карточек
cardList.renderItems();

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle'
});

//создание классов для попапов с формами
const editPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (obj) => {
    userInfo.setUserInfo({
      name: obj['name-input'],
      job: obj['job-input']
    });
    editPopup.close();
  }
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (obj) => {
    const card = new Card({ place: obj['place-input'],
      link: obj['link-input'],
      cardSelector: '#element',
      handleCardClick: () => {
        imagePopup.open({ place, link });
      }
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);

    addPopup.close();
  }
});
addPopup.setEventListeners();

// слушатели для кнопок редактирования профиля и добавления карточки
editButton.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo();

  nameInput.value = profileData.name;
  jobInput.value = profileData.job;

  editPopup.open();
  editFormValidator.cleanErrors();
});

addButton.addEventListener('click', () => {
  placeInput.value = '';
  linkInput.value = '';

  addPopup.open();
  addFormValidator.cleanErrors();
});

// выбор форм и добавление им валидаторов
const editForm = document.forms['edit-form'];
const editFormValidator = new FormValidator(configObject, editForm);
editFormValidator.enableValidation();

const addForm = document.forms['add-form'];
const addFormValidator = new FormValidator(configObject, addForm);
addFormValidator.enableValidation();
