require('dotenv').config()
const express = require('express')
const session = require('express-session')
const { json } = require('body-parser')
const massive = require('massive')
const multer = require('multer')
const cors = require('cors')
const auth = require('./controllers/auth_controller')
const pc = require('./controllers/post_controller')
const uc = require('./controllers/user_controller')

// setup middleware
const app = express()
const upload = multer()
app.use(json())
app.use(cors())
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    })
)

// connect to the database
massive(process.env.CONNECTION_STRING)
    .then((db) => app.set('db', db))
    .catch((err) => console.log(err))

// auth routes
app.get('/auth/current', auth.getCurrent) // check for a user in the session
app.post('/auth/register', auth.register) // register a new user
app.post('/auth/login', auth.login) // log a user in
app.get('/auth/logout', auth.logout) // log a user out and destroy the session

app.post('/posts/upload', upload.single('image'), pc.create)
app.get('/posts/all', pc.read)
app.delete('/posts/delete/:id', pc.delete)
app.get('/posts/:id', pc.getPost)
app.get('/posts/comments/:id', pc.getComments)
app.post('/posts/comments', pc.addComment)

app.get('/users/:id', uc.getPosts)

// start er up
const port = process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}...`))
