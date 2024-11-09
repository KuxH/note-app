const express = require('express')
const app = express()

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
const PORT =3001
app.listen(PORT, ()=>{
    console.log('Server running on ${PORT}')
})