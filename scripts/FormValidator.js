class FormValidator {
  constructor(obj, form) {
    this._form = form;
    this._inputSelector = obj['inputSelector'];
    this._submitButtonSelector = obj['submitButtonSelector'];
    this._inactiveButtonClass = obj['inactiveButtonClass'];
    this._inputErrorClass = obj['inputErrorClass'];
    this._errorClass = obj['errorClass'];
  }

  _showInputError(input, errorMessage) {
    this._error = this._form.querySelector(`#${input.id}-error`);

    input.classList.add(this._inputErrorClass);
    this._error.textContent = errorMessage;
    this._error.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    this._error = this._form.querySelector(`#${input.id}-error`);

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
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
    });

      this._setEventListeners(this._form);
  }
}

class ErrorsCleaner extends FormValidator {
  constructor(obj, form) {
    super(obj, form);
  }

  cleanErrors() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);

    super._toggleButtonState(inputList, button);

    inputList.forEach(input => {
      super._hideInputError(input);
    });
  }
}

export { FormValidator, ErrorsCleaner };
