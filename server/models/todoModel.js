const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const todoSchema = new Schema({
    task: String,
    status: Boolean,
    tags: [{
        type: String
    }]
})

const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo