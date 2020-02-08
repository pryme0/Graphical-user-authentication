const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Image not uploaded,provide name"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const imag = mongoose.model('image', imageSchema)
module.exports = imag