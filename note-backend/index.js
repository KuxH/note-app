const express = require('express')
const app = express()

const requestLogger = (request, response, next)=>{
    console.log('Method:', req.method)
    console.log('Path:', req.path)
    console.log('Body:', req.body)
    console.log('------')
    next()
}

app.use(express.json())

app.get('/',(request, response)=>{
    response.send('<h1>hello world</h1>')
})

app.get('/api/notes/:id', (request,response) =>{
    const id = request.params.id
    const note = notes.find(note => note.id == id)
    response.json(notes)

})

app.delete('/api/notes:id',(request,response) =>{
    const id = Number(request.parms.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes',(request,response)=>{
    const note =request.body
    console.log(note)
    response.json(note)
})


const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server running on: ${PORT}`)
}) 