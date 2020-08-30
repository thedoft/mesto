function showInputError(obj, form, input, errorMessage) {
  const error = form.querySelector(`#${input.id}-error`);

  input.classList.add(obj['inputErrorClass']);
  error.textContent = errorMessage;
  error.classList.add(obj['errorClass']);
}

function hideInputError(obj, form, input) {
  const error = form.querySelector(`#${input.id}-error`);

  input.classList.remove(obj['inputErrorClass']);
  error.classList.remove(obj['errorClass']);
  error.textContent = '';
}

function isValid(obj, form, input) {
  if (!input.validity.valid) {
    showInputError(obj, form, input, input.validationMessage);
  } else {
    hideInputError(obj, form, input);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  });
}

function toggleButtonState(obj, inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(obj['inactiveButtonClass']);
  } else {
    button.classList.remove(obj['inactiveButtonClass']);
  }
}

function setEventListeners(obj, form) {
  const inputList = Array.from(form.querySelectorAll(obj['inputSelector']));
  const button = form.querySelector(obj['submitButtonSelector']);

  toggleButtonState(obj, inputList, button);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(obj, form, input);
      toggleButtonState(obj, inputList, button);
    });
  });
}

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj['formSelector']));

  formList.forEach(form => {
    form.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    setEventListeners(obj, form);
  });
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
