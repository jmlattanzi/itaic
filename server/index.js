require('dotenv').config()
const express = require('express')
const session = require('express-session')
const { json, urlencoded } = require('body-parser')
const massive = require('massive')
const multer = require('multer')
const cors = require('cors')
const auth = require('./controllers/auth_controller')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const am = require('./middleware/auth_middleware')
const uc = require('./controllers/user_controller')
const pc = require('./controllers/post_controller')
const cc = require('./controllers/comment_controller')

// setup middleware
const app = express()
const upload = multer()

// production build
// app.use('/dist', express.static('dist'))

app.use(helmet())
app.use(morgan('tiny'))
app.use(morgan('common', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors())
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    })
)

// app.use('/dist', express.static('dist'))

// connect to the database
massive(process.env.CONNECTION_STRING)
    .then((db) => app.set('db', db))
    .catch((err) => console.log(err))

// auth routes
app.get('/auth/logout', auth.logout) // log a user out
app.post('/auth/register', auth.register) // register a new user
app.post('/auth/login', auth.login) // log a user in
app.get('/auth/current', auth.get_current_user) // check for a user in the session

// post routes
app.get('/posts/all', pc.get_all_posts) // get all posts
app.get('/posts/:id', pc.get_single_post) // get a single post
app.get('/posts/user/:id', pc.get_user_posts) // get all of a users posts
app.get('/posts/like/:id', pc.get_likes)
app.put('/posts/update/:id', pc.update_post) // edit the caption of a post
app.put('/posts/like/:id', pc.like_post) // like a post
app.post('/posts/upload', upload.single('image'), pc.upload_post) // upload a post
app.post('/posts/avatar', upload.single('image'), pc.upload_avatar) // change a users avatar
app.delete('/posts/delete/:id', pc.delete_post)

app.get('/comments/:id', cc.get_comments) // get comments
app.post('/comments/add', cc.add_comment) // add a comment
app.delete('/comments/:id', cc.delete_comment) // delete a post and it's comments]
app.put('/comments/:id', cc.update_comment) //edit a comment

// user routes
app.get('/user/:id', uc.get_user) // get info on the op
app.get('/user/account/:id', uc.get_account)
app.put('/users/bio/:id', uc.change_bio)

// production build
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/../index.html'))
// })

// start 'er up
const port = process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}...`))
