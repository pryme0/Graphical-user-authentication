const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'please enter your fullname ']
    },
    email: {
        type: String,
        required: [true, 'please enter your email']
    },
    password: {
        type: String,
        required: [true, 'please provide a password']
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre('save', function(next) {
    const User = this
    bcrypt.hash(User.password, 10, (error, encrypted) => {
        User.password = encrypted
        next()
    })
})
const user = mongoose.model('user', userSchema)
module.exports = user