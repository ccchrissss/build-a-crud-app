// console.log('may the node be with you, mon')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://chrisnelson7791:maythe4th@cluster0.q3fvgdy.mongodb.net/test?retryWrites=true&w=majority'


// the below code does not seem to work.
// MongoClient.connect(connectionString, (err, client) => {
//   if (err) return console.error(err)
//   console.log('Connected to database')
// })

// The below code does work. It uses a promise chain stead of callbacks
MongoClient.connect( connectionString )
  .then( client => {
    console.log('Connected to database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.use(bodyParser.urlencoded({ extended: true }))

    // app.use()
    app.get('/', (req, res) => {
      db.collection('quotes')
        .find()
        .toArray()
        .then(results => {
          console.log(results)
        })
        .catch(error => console.error(error))
    })

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    // app.listen()





    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
    })

    app.post('/quotes', (req, res) => {
      // console.log('verrrry nicccce')
      console.log(req.body)
    })

    app.listen(3000, function() {
      console.log('listening on PORT 3000')
    })

  })
  .catch( error => console.error(error))


