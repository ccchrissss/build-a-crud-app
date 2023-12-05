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

    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())


    // Read Start
    app.get('/', (req, res) => {
      db.collection('quotes')
        .find()
        .toArray()
        .then(results => {
          // console.table(results)
          res.render('index.ejs', { quotes: results })
          // res.sendFile(__dirname + '/index.html')
        })
        .catch(error => console.error(error))
    })
    // Read End

    // Create Start
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    // Create End



// Now let's add an html element that tells you when modifiedCount === 0 or something like the .delete shtuff
// must change .findOneAndUpdate() to updateOne() because findOneAndUpdate does not say it return the modifiedCount variable in the returned document




// Original Update, per the Zell tutorial
    // // Update Start
    // app.put('/quotes', (req, res) => {
    //   quotesCollection
    //     .findOneAndUpdate(
    //       { name: 'Yoda' }, 
    //       {
    //         $set: {
    //           name: req.body.name,
    //           quote: req.body.quote,
    //         },
    //       },
    //       {
    //         upsert: true,
    //       }
    //     )
    //     .then(result => {
    //       console.log('this is the result of .then() after .findOneAndUpdate(): ', result)
    //       res.json('Success')
    //     })
    //     .catch(error => console.error(error))
    // })
    // // Update End

// Update which dynamically adds html when there are no more Yoda quotes to Darth Vader invade
    // Update Start
    app.put('/quotes', (req, res) => {
      quotesCollection
        .updateOne(
          { name: 'Yoda' }, 
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then(result => {
          if (result.modifiedCount === 0) {
            console.log('result.modifiedCount: ', result.modifiedCount)
            return res.json('No Yoda quote to update')
          }
          res.json(`Updated Yoda's quote with Darth Vader's quote`)
          // the below console.log appears in the console inwhich the server is launched. i.e. the vs code terminal
          // console.log('this is the result of .then() after .updateOne(): ', result)
          // res.json('Success')
        })
        .catch(error => console.error(error))
    })
    // Update End

    // Delete Start
    app.delete('/quotes', (req, res) => {
      quotesCollection
        .deleteOne(
          { name: req.body.name },
        )
        .then( result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json(`Deleted Darth Vader's quote`)
          // the below console.log appears in the console inwhich the server is launched. i.e. the vs code terminal
          console.log('i deleted darf vaderrr')
        })
        .catch(error => console.error(error))
    })
    // Delete End






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



