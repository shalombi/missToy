const express = require('express')
const cors = require('cors')

const cookieParser = require('cookie-parser')

const toyService = require('./services/toy.service')

const app = express()

// Express Config:
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

const corsOptions = {
  origin: [
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3030',
    'http://localhost:8080',
    'http://localhost:3039',
    'http://localhost:3000',

  ],
  credentials: true
}
app.use(cors(corsOptions))

// Express Routing:

// LIST
app.get('/api/toy', (req, res) => {
  const { name, page } = req.query
  // console.log(name, page, ';;;***');
  const filterBy = {
    name: name || '',
    page: +page || 0,
  }
  toyService.query(filterBy)
    .then((toys) => {
      console.log(toys, 'HOOO TOYS TO FRONTEND')
      res.send(toys)
    })
})

// READ
app.get('/api/toy/:toyId', (req, res) => {
  const { toyId } = req.params
  toyService.getById(toyId).then((toy) => {
    res.send(toy)
  })
})

// ADD
app.post('/api/toy/', (req, res) => {
  const { name, price } = req.body

  const toy = {
    name,
    price,
  }

  toyService.save(toy)
    .then((savedToy) => {
      res.send(savedToy)
    })
})

// UPDATE
app.put('/api/toy/:toyId', (req, res) => {
  // TODO: EXPRESS.JSON()
  const { name, price, _id } = req.body

  const toy = {
    _id,
    name,
    price,
  }
  toyService.save(toy).then((savedToy) => {
    res.send(savedToy)
  })
})

// DELETE
app.delete('/api/toy/:toyId', (req, res) => {
  const { toyId } = req.params
  toyService.remove(toyId).then(() => {
    res.send('Removed!')
  })
})

// LOGIN
app.post('/login', (req, res) => {
  console.log('req.body:', req.body)
  res.cookie('user', req.body)
  res.send('logging  in')
})
app.post('/logout', (req, res) => {
  res.clearCookie('loggedInUser')
  res.clearCookie('user')
  res.send('logging  uot')
})

app.listen(3039, () =>
  console.log(`Server listening on port http://127.0.0.1:3039/`)
)
