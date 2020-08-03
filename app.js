const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const port = 3000

// 運行 app.js 時候 一併執行該檔案
require('./config/mongoose')
const routes = require('./routes')

const app = express()

// set handlebars 
app.engine('hbs', exphbs({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// homepage
app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})