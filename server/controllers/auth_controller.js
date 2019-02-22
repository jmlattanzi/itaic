// implement this soon
// email to confirm account
// admin email: itaic_sign_up@yahoo.com
// try {
// } catch (e) {
//     res.status(500).json(e)
// }

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
                        // let account = await `mail.createTestAccount()`

                        let transporter = mail.createTransport({
                            service: 'yahoo',
                            auth: {
                                user: 'itaic_sign_up@yahoo.com',
                                pass: process.env.DB_PASS,
                            },
                        })

                        let mailOptions = {
                            from: "itaic_sign_up@yahoo.com",
                            to: req.body.email,
                            subject: 'Account Created',
                            text: 'Account Created',
                        }

                        transporter
                            .sendMail(mailOptions)
                            .then((info) => console.log('email sent', info))
                            .catch((err) => console.log(err))

                        // console.log('Message sent: ' + info.messageId)
                        // console.log('preview: ' + mail.getTestMessageUrl(info))
                        res.status(200).json(data)
                    })
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

            console.log(`username: ${req.body.username}\npassword: ${req.body.password}`)

            let results = await db.get_user(req.body.username)
            let user = results[0]

            if (!user) {
                res.status(401).json('User does not exist on this plane of mortality')
            } else {
                let authorizedUser = await bc.compare(req.body.password, user.hash)
                if (authorizedUser) {
                    req.session.user = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                    }

                    req.session.authenticated = true

                    console.log(req.session.authenticated)

                    res.status(200).json(req.session.user)
                } else {
                    req.session.authenticated = false
                    res.status(409).json({ err: 'Invalid password. Moron.' })
                }
            }
        } catch (err) {
            res.status(500).json({ err: err })
        }
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
        try {
            if (req.session.user) {
                res.json(req.session.user)
            } else {
                res.json('No user in the session')
            }
        } catch (e) {
            res.status(500).json({ err: 'Internal server error' })
        }
    },
}
