export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    // добавление слушателя для закрытия попапа нажатием на Esc
    document.body.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // удаление слушателя для закрытия попапа нажатием на Esc
    document.body.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button')
    .addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
