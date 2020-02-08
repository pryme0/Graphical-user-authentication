const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcryptjs')
const multer = require('multer')
const path = require('path')
const imag = require('../models/images')
const User = require('../models/user')
const auth = require('../middleware/auth')

//setting storage path for multer
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/passimgs/')
    },
    filename: function(req, file, cb) {
        /*Appending extension with original name*/
        cb(null, file.originalname + path.extname(file.originalname))
    }
})
let uploads = multer({ storage: storage })

//renders registeration page
router.get('/register', async(req, res) => {
    let images = await imag.find({})
    res.render('register', { images })
})

//renders admin page
router.get('/admin', /*auth,*/ (req, res) => {
    res.render('admin')
})


//uploading multiple images using multer
router.post('/upload', uploads.array('photos', 7), async(req, res, next) => {
    let report = ""
    req.files.forEach(file => {
        let name = file.filename
        imag.create({ name: `/passimgs/${name}` }, (error, uplo) => {
            if (error) {
                let report = "Files not uploaded try again"
                    //return res.json("Files not uploaded try again")

                next()

            } else {
                let report = "Files uploaded sucessfully"
                    // return res.json("Files uploaded sucessfully")
                next()
            }
        })
    })
    return res.json(report)
})

//getting random images from the image collection
router.get('/getimages', async(req, res) => {
    let rand = Math.random() * 10
    let rand2 = Math.floor(rand)
    const images = await imag.find({}, (err, img) => {
        return img
    }).sort({ "_id": 1 }).limit(12).skip(rand2)

    res.json(images)
})

//getting users from the users collection
router.get('/getusers', async(req, res) => {

    let users = await User.find({}, (err, Users) => {

    })
    return res.json(users)
})

//registration controller
router.post('/register', (req, res) => {
        const { fullname, email, password } = req.body
        let response = ""
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    response = "User already exists"
                    return res.json(response)
                } else {
                    User.create({ fullname, email, password }, (error, use) => {
                        if (error) {
                            response = error
                            return res.json(response)
                        } else {
                            response = " Registration sucessfull"
                            return res.json(response)
                        }
                    })
                }
            })
    })
    //renders login page 
router.get('/login', (req, res) => {
    res.render('login')
})

//login controller
router.post('/login', (req, res) => {
    //checking if email is valid
    const { email, password } = req.body
    User.findOne({ email }, (error, use) => {
        if (use) {
            //authenticating user password
            bcrypt.compare(password, use.password, (error, same) => {
                //user password match
                if (same) {
                    req.session
                    req.session.userId = use._id
                    req.session.email = use.email
                    fullname = use.fullname
                    mail = use.email
                    return res.json({ report: 'match', email: email, fullname: fullname })
                } else {

                    return res.json("Password missmatch")
                }
            })
        } else {
            return res.json("user not found")
        }

    })
})

//render user dashboard 
router.get('/dashboard/', async(req, res) => {
    const userId = req.session.userId
    const user = await User.findById(userId)
    const fullname = user.fullname
    email = user.email
    res.render('dashboard', {
        fullname,
        email
    })
})

//delete single user from the user collection
router.post('/delete/:id', async(req, res) => {
    const del = await User.findById(req.params.id).deleteOne()
    if (del) {

        return res.json('deleted')

    } else {

        return res.json('not deleted')
    }

})

//delete single images from the  image collection
router.post('/deleteimages/:id', async(req, res) => {
    const del = await imag.findById(req.params.id).deleteOne()
    if (del) {

        return res.json('deleted')

    } else {

        return res.json('not deleted')
    }

})

//get all the images in the image collection
router.get('/adminimages', async(req, res) => {
    let image = await imag.find({})
    return res.json(image)
})

router.get('/passwordreset', (req, res) => {
    res.render('reset')
})


//reset user password
router.post('/passwordreset', async(req, res) => {
    let { email, password } = req.body
    const userpass = await User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.error(err)
            return res.json(err)
        } else {
            bcrypt.hash(password, 10, function(error, encrypted) {
                password = encrypted
                user.update({ password: password }, (erro, updat) => {
                    if (erro) {
                        return res.json("password reset failed try again")

                    } else {
                        return res.json("password reset sucessfull click login to login")
                    }

                })

            })

        }

    })
})

module.exports = router