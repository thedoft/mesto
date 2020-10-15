import './index.css';
import {
  avatarSelector,
  profileTitleSelector,
  profileSubtitleSelector,
  profileAvatar,
  editAvatarButton,
  editProfileButton,
  addCardButton,
  confirmPopupSelector,
  editAvatarPopupSelector,
  editProfilePopupSelector,
  addCardPopupSelector,
  imagePopupSelector,
  editAvatarSubmitButton,
  editProfileSubmitButton,
  addCardSubmitButton,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  cardListSelector,
  cardSelector,
  configObject
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';

// выбор форм и добавление им валидаторов
const editAvatarForm = document.forms['edit-avatar-form'];
const editAvatarFormValidator = new FormValidator(configObject, editAvatarForm);

const editProfileForm = document.forms['edit-profile-form'];
const editProfileFormValidator = new FormValidator(configObject, editProfileForm);

const addCardForm = document.forms['add-card-form'];
const addCardFormValidator = new FormValidator(configObject, addCardForm);

// создание класса Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '9dad3ee9-138f-48bd-8014-b648376a609a',
    'Content-Type': 'application/json'
  }
});

// функция вывода ошибки ответа сервера в консоль
const consoleLogError = err => {
  console.log(err);
};

// функция включения/отключения видимости загрузки данных
const renderLoading = (button, isLoading) => {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
};

// запрос к серверу на получение данных пользователя
const userData = api.getUserData();

userData.then(data => {
    const userId = data._id;
    document.querySelector(profileTitleSelector).textContent = data.name;
    document.querySelector(profileSubtitleSelector).textContent = data.about;
    document.querySelector(avatarSelector).src = data.avatar;

    return userId;
  })
  .then(userId => {
    // функциональное выражение для создания карточки
    const createCard = ({ name, link, likes, _id, owner }) => {
      const card = new Card({
        name,
        link,
        likes,
        _id,
        owner,
        cardSelector,
        handleCardClick: () => {
          imagePopup.open({ name, link });
        },
        handleLikeClick: () => {
          if (card.elementLikeButton.classList.contains('element__like-button_active')) {
            const unlikeCard = api.unlikeCard({ _id: card._id });

            unlikeCard.then(cardInfo => {
              card.elementLikesCount.textContent = cardInfo.likes.length;
            })
            .catch(err => {
              consoleLogError(err);
            });
          } else {
            const likeCard = api.likeCard({ _id: card._id });

            likeCard.then(cardInfo => {
              card.elementLikesCount.textContent = cardInfo.likes.length;
            })
            .catch(err => {
              consoleLogError(err);
            });
          }
        },
        handleDeleteClick: (card) => {
          confirmPopup.open(card);
        }
      });

      const cardElement = card.generateCard();

      if (owner._id !== userId) {
        cardElement.querySelector('.element__trash-button').remove();
      }

      if (card.likes.some(like => {
        return like._id === userId;
        })) {
        card.likeCard();
      }

      return cardElement;
    }

    // создание секции с карточками
    const cardList = new Section({
      renderer: ({ name, link, likes, _id, owner }) => {
        const card = createCard({ name, link, likes, _id, owner });
        cardList.addItem(card);
      }
    }, cardListSelector);

    // запрос к серверу на получение дефолтных карточек
    const initialCards = api.getInitialCards();

    initialCards.then(cards => {
      // отрисовка дефолтных карточек
      cardList.renderItems(cards);
    })
      .catch(err => {
        consoleLogError(err);
      });

    // создание класса данных пользователя
    const userInfo = new UserInfo({
      nameSelector: profileTitleSelector,
      jobSelector: profileSubtitleSelector,
    });

    // создание попапа с картинкой
    const imagePopup = new PopupWithImage({ popupSelector: imagePopupSelector });

    //создание классов для попапов с формами
    const confirmPopup = new PopupWithConfirm({
      popupSelector: confirmPopupSelector,
      handleConfirmClick: (card) => {
        console.log(card);
        const deleteCard = api.deleteCard({ _id: card._id });

        deleteCard.catch(err => {
          consoleLogError(err);
        });

        card.removeCard();
        confirmPopup.close();
      }
    });

    const editAvatarPopup = new PopupWithForm({
      popupSelector: editAvatarPopupSelector,
      handleFormSubmit: (inputsValues) => {
        renderLoading(editAvatarSubmitButton, true);

        const patchAvatar = api.patchUserAvatar({ avatar: inputsValues['avatar-input'] });

        patchAvatar.then(({ avatar }) => {
          profileAvatar.src = avatar;
        })
        .catch(err => {
          consoleLogError(err);
        })
        .finally(() => {
          renderLoading(editAvatarSubmitButton, false);
          editAvatarPopup.close();
        })
      }
    });

    const editProfilePopup = new PopupWithForm({
      popupSelector: editProfilePopupSelector,
      handleFormSubmit: (inputsValues) => {

        renderLoading(editProfileSubmitButton, true);

        const patchProfile = api.patchUserProfile({
          name: inputsValues['name-input'],
          about: inputsValues['job-input']
        });

        patchProfile.then(({ name, about }) => {
          userInfo.setUserInfo({ name, about })
        })
        .catch(err => {
          consoleLogError(err);
        })
        .finally(() => {
          renderLoading(editProfileSubmitButton, false);
          editProfilePopup.close();
        })
      }
    });

    const addCardPopup = new PopupWithForm({
      popupSelector: addCardPopupSelector,
      handleFormSubmit: (inputsValues) => {
        renderLoading(addCardSubmitButton, true);

        const newCard = api.addNewCard({
          name: inputsValues['place-input'],
          link: inputsValues['link-input'],
        });

        newCard.then(({ name, link, likes, _id, owner }) => {
          return createCard({ name, link, likes, _id, owner });
        })
        .then(card => {
          cardList.addItem(card);
        })
        .catch(err => {
          consoleLogError(err);
        })
        .finally(() => {
          renderLoading(addCardSubmitButton, false);
          addCardPopup.close();
        })
      }
    });

    const classes = {
      cardList,
      userInfo,
      imagePopup,
      confirmPopup,
      editAvatarPopup,
      editProfilePopup,
      addCardPopup
    };

    return classes;
  })
  .then(classes => {
    classes.imagePopup.setEventListeners();
    classes.confirmPopup.setEventListeners();
    classes.editAvatarPopup.setEventListeners();
    classes.editProfilePopup.setEventListeners();
    classes.addCardPopup.setEventListeners();

    // слушатели для кнопок редактирования аватара и профиля и кнопки добавления карточки
    editAvatarButton.addEventListener('click', () => {
      editAvatarFormValidator.cleanErrors();
      classes.editAvatarPopup.open();
    });

    editProfileButton.addEventListener('click', () => {
      const profileData = classes.userInfo.getUserInfo();

      nameInput.value = profileData.name;
      jobInput.value = profileData.about;

      editProfileFormValidator.cleanErrors();
      classes.editProfilePopup.open();
    });

    addCardButton.addEventListener('click', () => {
      placeInput.value = '';
      linkInput.value = '';

      addCardFormValidator.cleanErrors();
      classes.addCardPopup.open();
    });
  })
  .catch(err => {
    consoleLogError(err);
  })
  .finally(() => {
    editAvatarFormValidator.enableValidation();
    editProfileFormValidator.enableValidation();
    addCardFormValidator.enableValidation();
  });
