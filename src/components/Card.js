export default class Card {
  constructor({ name, link, likes, _id, owner, cardSelector, handleCardClick, handleLikeClick, handleDeleteClick }) {
    this._title = name;
    this._image = link;
    this.likes = likes;
    this._id = _id;
    this._owner = owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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
    this.elementLikeButton = this._element.querySelector('.element__like-button');
    this._elementTrashButton = this._element.querySelector('.element__trash-button');
    this.elementLikesCount = this._element.querySelector('.element__likes-count');

    this._setEventListeners();

    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._elementTitle.textContent = this._title;
    this.elementLikesCount.textContent = this.likes.length;

    return this._element;
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick();
    });
    this.elementLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
      this.likeCard();
    });
    this._elementTrashButton.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
  }

  likeCard() {
    this.elementLikeButton.classList.toggle('element__like-button_active');
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
