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


app.get('/', (req, res, next) => {
    res.write('<h1>Hello world</h1>')
})

app.get('/api/notes', (req, res, next) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
    .catch(error => next(error))
})
 
app.post('/api/notes', (req, res, next) => {
    console.log("post called")
    const note = req.note
    
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
    .catch(error => next(error))
})

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => {
        if (note) {
            res.json(note)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})
const unknown = (req, res, next) => {
    res.status(404).send({error: 'Unknown endpoint'})
    next()
}
app.use(unknown)

const errorHandler = (error, req, res, next) =>{
    console.error(error.name)
    return res.status(404).end
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})