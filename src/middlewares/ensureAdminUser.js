const knex = require('../database')
const AppError = require('../utils/AppError')

async function ensureAdminUser(req, res, next){
  const userId = req.user.id
  
  try {
    const user = await knex('users').where({ id: userId }).first()

    if(!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    if(!user.isAdmin) {
      throw new AppError('Acesso negado: você não é um administrador', 403)
    }

    return next()
  }catch(error) {
    next(error)
  }

}

module.exports = ensureAdminUser