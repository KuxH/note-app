const express = require('express')
const app = express()

app.get('/',(request, response)=>{
    response.send('<h1>hello world</h1>')
})

app.get('/api/notes', (request,response) =>{
    const id = request.params.id
    const note = notes.find(note => note.id == id)
    response.json(notes)

})

const PORT =3001
app.listen(PORT, ()=>{
    console.log('Server running on ${PORT}')
})