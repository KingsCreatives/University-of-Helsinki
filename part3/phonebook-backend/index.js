const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3001

const Person = require('./model/phonebook')

app.use(express.static('dist'))

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'MongoError' && error.code === 11000) {
    return res.status(400).json({ error: 'Duplicate field value entered' })
  }
  next(error)
}

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms'))

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => next(error))
})

app.get('/info', async (req, res) => {
  const text = `Phonebook has info for ${await Person.countDocuments()} person`
  const date = new Date().toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'long',
  })
  const response = `${text}\n${date}`
  return res.send(response)
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((contactData) => {
      return res.status(200).json(contactData)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  Person.findOne({ name: name.toLowerCase() }, { runValidators: true })
    .then((existingPerson) => {
      if (existingPerson) {
        return res.status(409).json({ error: 'name must be unique' })
      }

      const person = new Person({
        name,
        number,
      })

      return person.save()
    })
    .then((savedPerson) => {
      res.status(201).json(savedPerson)
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`app is running on PORT:${PORT}`)
})
