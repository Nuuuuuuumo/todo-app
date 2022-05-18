const {Schema, model} = require('mongoose')

const taskSchema = new Schema({
    task: {
        type: String,
        requires: true,
    }
})

module.exports = model('task', taskSchema)