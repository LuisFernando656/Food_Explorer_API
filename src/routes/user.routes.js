const { Router } = require('express')

const userRouter = Router()

userRouter.post('/', (req, res) => {
  const { name, email, password } = req.body

  res.json({name, email, password})
})

module.exports = userRouter