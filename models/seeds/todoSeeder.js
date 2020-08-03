const db = require('../../config/mongoose')
const todo = require('../todo')

db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    todo.create({ name: 'name-' + i })
  }

  console.log('done')
})