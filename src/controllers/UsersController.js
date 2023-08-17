const { hash, compare } = require('bcryptjs')
const AppError = require("../utils/AppError")
const knex = require('../database')

class UsersController {
  async create (req, res) {
    const { name, email, password } = req.body

    const checkUserExists = await knex('users').where('email', email).first()

    if(checkUserExists) {
      throw new AppError('Esse e-mail ja está em uso', 400)
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({
      name,
      email,
      password: hashedPassword
    })

    res.json()
  }

  async update (req, res) {
    const { name, email, password, old_password } = req.body
    const { id } = req.params

    const user = await knex('users').where('id', id).first()

    if(!user) {
      throw new AppError('Usuário nao encontrado', 404)
    }

    const userWithUpdatedEmail = await knex('users')
      .where('email', email)
      .whereNot('id', id)
      .first();
   
    if(userWithUpdatedEmail){
      throw new AppError('Este email já esta em uso')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if(password && !old_password){
      throw new AppError('Você precisa informar a senha antiga pra definir uma senha nova')
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword){
        throw new AppError("A senha antiga nao confere")
      }

      user.password = await hash(password, 8)
    }

    await knex('users').where('id', id).update({
      name,
      email,
      password: user.password,
      updated_at: knex.fn.now()
    })

    return res.status(200).json()
  }
}

module.exports = UsersController