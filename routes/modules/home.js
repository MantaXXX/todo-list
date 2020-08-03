const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  Todo.find()   // 取出 todo models 所有資料
    .lean()   // 將 Mongoose 的 Model 物件轉換成乾淨的 JS 資料陣列
    .sort({ name: 'asc' }) // 反序：'desc'
    .then(todos => res.render('index', { todos }))    // 資料傳給 index 模板
    .catch(error => console.log(error))   // 錯誤回報
})


module.exports = router