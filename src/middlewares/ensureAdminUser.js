const AppError = require('../utils/AppError')

async function ensureAdminUser(req, res, next){
    const { admin } = req.user

    if(!admin) {
      throw new AppError('Acesso negado, você não é um administrador', 401)
    }

    return next()
}

module.exports = ensureAdminUser