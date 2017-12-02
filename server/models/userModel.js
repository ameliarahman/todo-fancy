const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
            },
            message: 'Email format is invalid!'
        }
    },
    username: {
        type: String,
        unique: true
    },
    password: String,
    task: [{
        type: Schema.Types.ObjectId,
        ref: 'todos'
    }]
})

const User = mongoose.model('users', userSchema);

module.exports = User