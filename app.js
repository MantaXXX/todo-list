const express = require('express')
const port = 3000
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()

// set database connection
mongoose.connect('mongodb://localhost/todo_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// set connection response
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})
// set handlebars 
const exphbs = require('express-handlebars')
const todo = require('./models/todo')
app.engine('hbs', exphbs({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// homepage
app.use(routes)



app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})