// email to confirm account
// try {
//     let account = await mail.createTestAccount()

//     let transporter = mail.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         secure: false,
//         auth: {
//             user: account.user,
//             pass: account.pass,
//         },
//     })

//     let mailOptions = {
//         from: "'Admin' <admin@itaic.com>",
//         to: "'jml' <jonathanlattanzi@gmail.com>",
//         subject: 'Account creation',
//         text: 'Account created',
//         html: '<h1>haha yes</h1>',
//     }

//     let info = await transporter.sendMail(mailOptions)

//     console.log('Message sent: ' + info.messageId)
//     console.log('preview: ' + mail.getTestMessageUrl(info))
//     res.status(200).json('message sent')
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
                db.register_user([
                    req.body.username,
                    req.body.email,
                    hashpassword,
                ])
                    .then((data) => res.send(data))
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

            let results = await db.get_user(req.body.username)
            let user = results[0]

            if (!user) {
                res.status(401).json(
                    'User does not exist on this plane of mortality'
                )
            } else {
                let authorized = await bc.compare(req.body.password, user.hash)
                if (authorized) {
                    req.session.user = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                    }

                    res.status(200).json(req.session.user)
                } else {
                    res.status(409).json({ err: 'Invalid password. Moron.' })
                }
            }
        } catch (err) {
            res.status(500).json({ err: 'Internal server error' })
        }
    },

    // logout
    logout: async (req, res) => {
        req.session.destroy()
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
    getCurrent: async (req, res) => {
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
