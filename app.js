const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var logger = require('morgan');

require('dotenv').config()

// Get Routes
const articles = require('./routes/articles.js')

// Set Port
const PORT = process.env.PORT || 5000

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

// Logging
app.use(logger('dev'));

// DB Config
const db = process.env.DB_URL

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// Start Server
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})

module.exports = app;
