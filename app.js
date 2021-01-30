const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const expressSession = require('express-session')
const nodemailer = require('nodemailer')
const fileUpload = require('express-fileupload')
const expressLayouts = require('express-ejs-layouts')

// load env configuration as early as possible
dotenv.config({
    path: '.env'
});


const app = express()

const port = 3000 || process.env.port;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(conect=>{
    console.log('mongodb connected successfully');
}).catch(err=>{
    console.log(err);
})

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

app.listen(port, () => {
    console.log("server started on port 3000")
})