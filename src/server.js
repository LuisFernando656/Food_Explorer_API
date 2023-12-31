require('dotenv/config')
require('express-async-errors')

const AppError = require('./utils/AppError')

const express = require('express')
const routes = require('./routes')
const uploadConfig = require('./configs/upload')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use(routes)

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use((error, req, res, next) => {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error)

  return res.status(500).json({
    status: "error",
    message: "Internal servor error"
  })
})

const PORT = 4444
app.listen(PORT, () => console.log(`server is running on ${PORT}`))