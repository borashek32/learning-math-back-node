const ApiError = require('../exceptions/ApiError')

module.exports = function (error, req, res, next) {
  console.error(error) // Выводим ошибку в консоль для отладки

  if (error instanceof ApiError) {
    return res.status(error.status).json({ errors: error.errors, message: error.message })
  }

  return res.status(500).json({ message: 'Some error occurred' })
}
