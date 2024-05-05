const express = require('express')

const app = express()

const PORT = procee.env.PORT

app.use(express.static('public'))
app.use(express.json())
