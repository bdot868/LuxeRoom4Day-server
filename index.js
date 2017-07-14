const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  usersRoutes = require('./routes/users.js'),
  cors = require('cors'),
  request = require('request'),
  mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/luxeroom4day',
  port = process.env.PORT || 3001

  // connect to mongodb:
  mongoose.connect(mongoUrl, (err) => {
    console.log(err || 'connected to MongoDb. 🤙🏽')
  })

  // Log all incoming requests to the console:
  app.use(logger('dev'))

  // alllow incoming ajax requests from other domains (including other localhost ports)
  app.use(cors())

  //interpret bodies of data that are included in requests:
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false})) //interpret form data

  app.get('/', (req, res) => {
    res.json({message: "Server root. All API routes start with a luxury room!"})
  })


app.use('/api/users', usersRoutes)

app.listen(port, (err) => {
  console.log(err || `Server running on ${port}`)
})
