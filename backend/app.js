const express = require('express')
const cors = require('cors')

const routes = require('./routes/productRoute')

const app = express()

app.use(express.json())
app.use(cors()) // Enable CORS

/* This is the root route. It is used to check if the server is running. */
app.get('/', (req, res) => {
    res.status(200).json({ alive: 'True' })
})

/* Telling the server to use the routes in the ProductRoutes file. */
app.use('/api', routes)

module.exports = app
