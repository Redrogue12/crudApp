const express = require('express');
const router = express.Router();
const createError = require('http-errors')

// Bring in Models
let Article = require('../models/article')

// Log Routes
router.use('/', function (req, res, next) {
  console.log('Request Url:' + req.url);
  next();
});

// Home Route
router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
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

router.get('/edit/:id', (req, res) => {
  let query = { _id: req.params.id }
  Article.findOne({ _id: query })
    .exec((err, article) => {
      if (err) {
        console.log(err);
      } else {
        res.render('editArticle', {
          article
        })
      }
    })
})

router.post('/edit/:id', (req, res) => {
  let article = {}
  article.title = req.body.title
  article.author = req.body.author
  article.body = req.body.body

  let query = { _id: req.params.id }

  Article.update(query, article, (err, raw) => {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(raw)
      res.redirect('/')
    }
  })
})

router.delete('/:id', (req, res) => {
  let query = { _id: req.params.id }
  Article.deleteOne(query, err => {
    if (err) {
      console.log(err)
    } else {
      res.send('Success')
    }
  })
})

module.exports = router;