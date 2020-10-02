export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(input, errorMessage) {
    this._error = this._form.querySelector(`#${input.name}-error`);

    input.classList.add(this._inputErrorClass);
    this._error.textContent = errorMessage;
    this._error.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    this._error = this._form.querySelector(`#${input.name}-error`);

    input.classList.remove(this._inputErrorClass);
    this._error.classList.remove(this._errorClass);
    this._error.textContent = '';
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(input => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled', true);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, button);

    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState(inputList, button);
      });
    });
  }

  enableValidation() {
      this._setEventListeners(this._form);
  }

  cleanErrors() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, button);

    inputList.forEach(input => {
      this._hideInputError(input);
    });
  }
}
