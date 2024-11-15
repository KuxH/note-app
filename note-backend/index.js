const express = require('express')
const app = express()
require('dotenv').config();
const Note = require('./models/note')

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:', req.path)
    console.log('Body:', req.body)
    console.log('-------')
    next()
}

app.use(express.json())
app.use(requestLogger)

let notes = [
    {
        id: 1,
        content: "hello"
    }
]

app.get('/', (req, res) => {
    res.write('<h1>Hello world</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

app.post('/api/persons', (req, res) => {
    const note = req.body
    const random = Math.floor(Math.random() * 3290329023)

    if(note.number.length < 10){
        return res.status(400).send({error: 'Error in number'})
    }

    const noteObj = {
        id: random,
    }
    notes = notes.concat(noteObj)
    console.log(notes)
    res.json(noteObj)
})


const unkown = (req, res, next) => {
    res.status(404).send({error: 'Unknown endpoint'})
    next()
}
app.use(unkown)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})