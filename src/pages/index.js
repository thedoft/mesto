import './index.css';
import {
  profileAvatarSelector,
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

// создание класса данных пользователя
const userInfo = new UserInfo({
  avatarSelector: profileAvatarSelector,
  nameSelector: profileTitleSelector,
  jobSelector: profileSubtitleSelector,
});

// функциональное выражение для создания карточки
const createCard = ({ name, link, likes, _id, owner }, userId) => {
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
          card.setLikesCount(cardInfo.likes.length);
          card.likeCard();
        })
        .catch(err => {
          consoleLogError(err);
        });
      } else {
        const likeCard = api.likeCard({ _id: card._id });

        likeCard.then(cardInfo => {
          card.setLikesCount(cardInfo.likes.length);
          card.likeCard();
        })
        .catch(err => {
          consoleLogError(err);
        });
      }
    },
    handleDeleteClick: (card) => {
      confirmPopup.open(card);
    }
  }, userId);

  const cardElement = card.generateCard();

  return cardElement;
}

// создание секции с карточками
const cardList = new Section({
  renderer: ({ name, link, likes, _id, owner }, userId) => {
    const card = createCard({ name, link, likes, _id, owner }, userId);

    cardList.addItem(card);
  }
}, cardListSelector);

// создание попапа с картинкой
const imagePopup = new PopupWithImage({ popupSelector: imagePopupSelector });

//создание классов для попапов с формами
const confirmPopup = new PopupWithConfirm({
  popupSelector: confirmPopupSelector,
  handleConfirmClick: (card) => {
    const deleteCard = api.deleteCard({ _id: card._id });

    deleteCard.then(() => {
      card.removeCard();
      confirmPopup.close();
    })
    .catch(err => {
      consoleLogError(err);
    });
  }
});

const editAvatarPopup = new PopupWithForm({
  popupSelector: editAvatarPopupSelector,
  handleFormSubmit: (inputsValues) => {
    renderLoading(editAvatarSubmitButton, true);

    const patchAvatar = api.patchUserAvatar({ avatar: inputsValues['avatar-input'] });

    patchAvatar.then(({ avatar, name, about }) => {
      userInfo.setUserInfo({ avatar, name, about});
      editAvatarPopup.close();
    })
    .catch(err => {
      consoleLogError(err);
    })
    .finally(() => {
      renderLoading(editAvatarSubmitButton, false);
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

    patchProfile.then(({ avatar, name, about }) => {
      userInfo.setUserInfo({ avatar, name, about });
      editProfilePopup.close();
    })
    .catch(err => {
      consoleLogError(err);
    })
    .finally(() => {
      renderLoading(editProfileSubmitButton, false);
    })
  }
});

const addCardPopup = new PopupWithForm({
  popupSelector: addCardPopupSelector,
  handleFormSubmit: (inputsValues) => {
    renderLoading(addCardSubmitButton, true);

    const newCard = api.addNewCard({
      name: inputsValues['place-input'],
      link: inputsValues['link-input']
    });

    newCard.then(({ name, link, likes, _id, owner }, userId) => {
      return createCard({ name, link, likes, _id, owner }, userId);
    })
    .then(cardElement => {
      cardList.addItem(cardElement);
      addCardPopup.close();
    })
    .catch(err => {
      consoleLogError(err);
    })
    .finally(() => {
      renderLoading(addCardSubmitButton, false);
    });
  }
});

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

// основная логика приложения
Promise.all([
  api.getUserData(),
  api.getInitialCards()
])
.then((promisesArray) => {
  const userData = promisesArray[0];
  const userId = userData._id;
  const cards = promisesArray[1];

  userInfo.setUserInfo({
    avatar: userData.avatar,
    name: userData.name,
    about: userData.about
  });

  // отрисовка дефолтных карточек
  cardList.renderItems(cards, userId);
})
.then(() => {
  // слушатели для кнопок редактирования аватара и профиля и кнопки добавления карточки
  editAvatarButton.addEventListener('click', () => {
    editAvatarFormValidator.cleanErrors();
    editAvatarPopup.open();
  });

  editProfileButton.addEventListener('click', () => {
    const profileData = userInfo.getUserInfo();

    nameInput.value = profileData.name;
    jobInput.value = profileData.about;

    editProfileFormValidator.cleanErrors();
    editProfilePopup.open();
  });

  addCardButton.addEventListener('click', () => {
    placeInput.value = '';
    linkInput.value = '';

    addCardFormValidator.cleanErrors();
    addCardPopup.open();
  });

  // слушатели для попапов
  confirmPopup.setEventListeners();
  imagePopup.setEventListeners();
  editAvatarPopup.setEventListeners();
  editProfilePopup.setEventListeners();
  addCardPopup.setEventListeners();
})
.catch(err => {
  consoleLogError(err);
})
.finally(() => {
  editAvatarFormValidator.enableValidation();
  editProfileFormValidator.enableValidation();
  addCardFormValidator.enableValidation();
});
