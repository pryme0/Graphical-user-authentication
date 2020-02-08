const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const nodemailer = require('nodemailer')
const fileUpload = require('express-fileupload')
const expressLayouts = require('express-ejs-layouts')

const app = express()

mongoose.connect('mongodb://localhost:27017/graphicalpassword', { useNewUrlParser: true })

//app.use(fileUpload())
app.use(expressSession({
    secret: 'secrt',
    resave: true,
    saveUninitialized: true
}))
app.use(expressLayouts)
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static("public"))
app.set('views', `${__dirname}/views`)


const userRoutes = require('./routes/user')
app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log("server started on port 3000")
})