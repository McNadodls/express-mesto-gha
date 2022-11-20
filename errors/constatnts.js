const NOT_FOUND = {
    statusCode: 404,
  };
  const NOT_VALID = {
    statusCode: 400,
    message: 'Переданы некорретные данные',
  };
  const SERVER_ERROR = {
    statusCode: 500,
    message: 'Eternal error',
  };
  
  module.exports = { NOT_FOUND, NOT_VALID, SERVER_ERROR };