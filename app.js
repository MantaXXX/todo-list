const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
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
app.engine('hbs', exphbs({ defaultLayouts: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Todo.find()   // 取出 todo models 所有資料
    .lean()   // 將 Mongoose 的 Model 物件轉換成乾淨的 JS 資料陣列
    .then(todos => res.render('index', { todos }))    // 資料傳給 index 模板
    .catch(error => console.log(error))   // 錯誤回報
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name    // 取出表單 name 資料
  return Todo.create({ name })    // 存入資料庫
    .then(() => res.redirect('/'))    // 新增完成後，回到主頁
    .catch(error => { console.log(error) })
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})