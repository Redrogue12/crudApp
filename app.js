const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const createError = require('http-errors')

require('dotenv').config()

// Get Routes
const articles = require('./routes/articles.js')

// Set Port
const PORT = process.env.PORT || 3000

// Init App
const app = express()

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')))

//  View Engine
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');

// Use Routes
app.use('/', articles);

// DB Config
const db = process.env.DB_URL

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Start Server
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})

module.exports = app;
