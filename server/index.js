require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT
const databaseURL = process.env.DATABASE_URL

app.use(express.static('public'))
app.use(express.json())

const init = async (retryCount = 0) => {
  try {
    await mongoose.connect(databaseURL)
    console.log('Successfully connected to mongdb')
  } catch (error) {
    console.error(error)
    retryCount++
    if (retryCount <= 3) setTimeout(init, 5000)
    else clearTimeout(init)
  }
}

//mongoDB 연결
init()

app.use('/api/product', require('./routes/productRoutes'))

app.listen(port, () => console.log(`Server listening on port ${port}`))
