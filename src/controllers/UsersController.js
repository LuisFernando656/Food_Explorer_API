const AppError = require("../utils/AppError")
const dbConnection = require('../database')

class UsersController {
  create (req, res) {
    const { name, email, password } = req.body

    if(!name) {
      throw new AppError('Nome é obrigatório')
    }

    res.json({name,email,password})
  }
}

module.exports = UsersController