const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()


// Init App
const app = express()

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Load View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')))

// DB Config
const db = process.env.DB_URL

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Bring in Models
let Article = require('./models/article')

// Home Route
app.get('/', (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Articles',
        articles: articles
      })
    }
  })
})

// Add Route
app.get('/articles/add', (req, res) => {
  res.render('add_article', {
    title: 'Add Article'
  })
})

app.post('/articles/add', (req, res) => {
  let article = new Article()
  article.title = req.body.title
  article.author = req.body.author
  article.body = req.body.body

  article.save(err => {
    if (err) {
      console.log(err);
      return
    } else {
      res.redirect('/')
    }
  })
})

// Start Server
app.listen('3000', () => {
  console.log("server started on port 3000")
  
})
