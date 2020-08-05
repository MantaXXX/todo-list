const mongoose = require('mongoose')
// set database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo_list'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// set connection response
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db