export default class Card {
  constructor({ place, link, cardSelector, handleCardClick }) {
    this._title = place;
    this._image = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLikeButton = this._element.querySelector('.element__like-button');
    this._elementTrashButton = this._element.querySelector('.element__trash-button');

    this._setEventListeners();

    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._elementTitle.textContent = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => {
      this._likeCard();
    });
    this._elementTrashButton.addEventListener('click', () => {
      this._removeCard();
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _likeCard() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }
}
