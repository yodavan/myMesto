const validationElements = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button-save',
  inactiveButtonClass: 'button-save:disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__field-error_visible'
};


// функции добавления и удаления ошибок//
const showError = (formElement, inputElement, errorMessage, element) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(element.errorClass);
  inputElement.classList.add(element.inputErrorClass);
};

const hideError = (formElement, inputElement, element) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

  errorElement.textContent = '';
  errorElement.classList.remove(element.errorClass);
  inputElement.classList.remove(element.inputErrorClass);
};


//проверка инпутов на валидность//
const checkValidity = (formElement, inputElement, element) => {
  const InputNotValid = !inputElement.validity.valid;

  if(InputNotValid) {
    errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage, element);
  }
  else {
    hideError(formElement, inputElement, element);
  };
};


//проверка на наличие полей с ошибкой//
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};


//переключатель кнопки сабмита//
const toggleButtonState = (inputList, submitButtonElement, element) => {

  if(hasInvalidInput(inputList)) {
    submitButtonElement.classList.add(element.inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true);
  }
  else {
    submitButtonElement.classList.remove(element.inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  };
};


//слушатель ввода//
const setEventListeners = (formElement, element) => {
  const inputList = Array.from(formElement.querySelectorAll(element.inputSelector));
  const submitButtonElement = formElement.querySelector(element.submitButtonSelector);

  toggleButtonState(inputList, submitButtonElement, element);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, element);
      toggleButtonState(inputList, submitButtonElement, element);
    });
  });
};


//включение валидации//
const enableValidation = (element) => {
  const formList = document.querySelectorAll(element.formSelector);

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, element);
  });
};

enableValidation(validationElements);
