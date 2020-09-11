class Card {
  constructor(data, cardSelector) {
    this._image = data.link;
    this._title = data.name;
    this._cardSelector = cardSelector;
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
    this._popup = this._getPopupElement();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
    this._element.querySelector('.element__trash-button').addEventListener('click', (evt) => {
      this._removeCard(evt);
    });
  }

  _likeCard(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  _removeCard(evt) {
    evt.target.closest('.element').remove();
  }

  _getPopupElement() {
    const elementPopup = document.querySelector('.popup_type_image');

    return elementPopup;
  }
}

export default Card;
