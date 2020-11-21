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


export {
  consoleLogError,
  renderLoading
};
