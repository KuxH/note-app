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

app.post('/api/notes', (req, res) => {
    const note = req.body
    
    if (note.content === undefined) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    const newNote = new Note({
        content: note.content,
        important: note.important || false,
      
    })
    newNote.save().then(savedNote => {
        res.json(savedNote)
    })
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