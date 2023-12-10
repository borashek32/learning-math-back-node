const { Schema, model } = require('mongoose')

const Role = new Schema({
  value: { default: 'USER', type: String, unique: true },
})

module.exports = model('Role', Role)
