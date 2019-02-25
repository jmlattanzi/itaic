module.exports = {
    user_authenticated: (req, res, next) => {
        console.log('user session according to am', req.session.user)
        if (!req.session.user) {
            return res.status(409).json('You must be logged in')
        }

        next()
    },
}
