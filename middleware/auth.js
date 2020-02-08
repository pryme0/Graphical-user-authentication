module.exports = (req, res, next) => {
    if (req.session.email == "admin@gmail.com") {
        next()
    } else {
        res.redirect('/user/login')
    }

}