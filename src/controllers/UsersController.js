const { hash } = require('bcryptjs')
const AppError = require("../utils/AppError")
const knex = require('../database')

class UsersController {
  async create (req, res) {
    const { name, email, password } = req.body

    const checkUserExists = await knex('users').where('email', email).first()

    if(checkUserExists) {
      throw new AppError('Esse e-mail ja está em uso', 400)
    }

    if(password.length < 6) {
      throw new AppError('Senha muito curta, no mínimo 6 caracteres')
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({
      name,
      email,
      password: hashedPassword
    })

    res.json()
  }
}

module.exports = UsersController