const bc = require('bcryptjs')
const mail = require('nodemailer')

module.exports = {
    // register a user and place them in the db
    register: async (req, res) => {
        try {
            const db = req.app.get('db')
            let results = await db.get_user(req.body.username)
            let user = results[0]

            if (user) {
                res.status(409).json({ err: 'User already exists' })
            } else {
                let hashpassword = await bc.hash(req.body.password, 12)
                db.register_user([req.body.username, req.body.email, hashpassword])
                    .then((data) => {
                        res.status(200).json(data)
                    })
                    .catch((err) => console.log(err))
                let transporter = mail.createTransport({
                    service: 'yahoo',
                    auth: {
                        user: 'itaic_sign_up@yahoo.com',
                        pass: process.env.DB_PASS,
                    },
                })

                let mailOptions = {
                    from: 'itaic_sign_up@yahoo.com',
                    to: req.body.email,
                    subject: 'ITAIC Account Created',
                    html: `<div style='margin: 0 auto;'>
                    <h1 style='color: salmon'><em>ITAIC</em></h1>
                    <h3 style='text-align: center;'>Thank you for signing up ${
                        req.body.username
                    }!</h3>
                    <p style='color: black; text-align: center;'>If you have any questions or concerns please email an administrator at admin@itaic.co</p>
                    <footer><a href="http://itaic.co" style='text-decoration: none; color: salmon'>itaic</a></footer>
                </div>`,
                }

                transporter
                    .sendMail(mailOptions)
                    .then((info) => console.log('email sent', info))
                    .catch((err) => console.log(err))
            }
        } catch (err) {
            res.status(500).json({ err: 'internal server error' })
        }
    },

    // login to account
    login: async (req, res) => {
        try {
            const db = req.app.get('db')

            // let results = await db.get_user(req.body.username)
            // let user = results[0]

            // if (!user) {
            //     res.status(401).json('User does not exist on this plane of mortality')
            // }

            // let authorizedUser = await bc.compare(req.body.password, user.hash)
            // if (!authorizedUser) {
            //     res.json('not authorized')
            // }

            // req.session.user = {
            //     id: user.id,
            //     username: user.username,
            //     email: user.email,
            // }
            // req.session.save()

            // console.log('login:', req.session.user)
            // res.status(200).json(req.session.user)

            console.log(req.session)
            db.get_user(req.body.username)
                .then((data) => {
                    console.log('data in db.get_user', data)
                    if (!data[0]) {
                        res.status(401).json('user does not exist')
                    }

                    bc.compare(req.body.password, data[0].hash)
                        .then((auth) => {
                            console.log('auth', auth)
                            if (!auth) {
                                res.json('not authorized')
                            }

                            console.log('setting the user session')
                            req.session.user = {
                                id: data[0].id,
                                username: data[0].username,
                                email: data[0].email,
                            }
                            console.log('user session set', req.session.user)

                            res.status(200).json(req.session.user)
                        })
                        .catch((err) => console.log('error in bc.compare', err))
                })
                .catch((err) => console.log('error in db.get_user', err))
        } catch (err) {
            console.log('error in login,', err)
            res.status(500).json({ err: err })
        }

        console.log('req.session.user outside of try{}catch{}:', req.session.user)
    },

    // logout
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).json('Logged out')
    },

    // maybe this function should be in the user controller
    delete: async (req, res) => {
        // delete account
        try {
            const db = req.app.get('db')

            // check password and run delete_user
        } catch (e) {
            res.status(500).json({ err: 'Internal server error' })
        }
    },

    // get current user on the session
    get_current_user: (req, res) => {
        if (req.session.user) {
            res.json(req.session.user)
        } else {
            res.json('No user in the session')
        }
    },
}
