require('dotenv').config()
const express = require('express')
const {json} = require('body-parser')
const massive = require('massive')

// setup middleware
const app = express()
app.use(json())

// connect to the database
massive(process.env.CONNECTION_STRING).then(db => app.set('db', db))

// routes

// start er up
const port = 3001 || process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}...`))
