import { useState, useEffect } from "react"
import axios from 'axios'
const App =() =>{
    const [notes,setNotes] = useState([]) 
    const[newNote, setNewNote] = useState('')
    const [showAll,setShowAll] = useState(true)

    useEffect(()=>{
        axios.get('http://localhost:3001/notes').then(response =>{
            setNotes(response.data)
            console.log(response)
        })
        .catch(error => console.error("Err",error))
    
        
    }, [])

    const addNote= (event) =>{
        event.preventDefault()
        console.log(event.target.value)
    const noteObj ={
        value: newNote,
        important: false
    }
    axios
    .post('http://localhost:3001/notes', noteObj)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
    setNotes(notes.concat(noteObj))
    setNewNote('')
    }
    const handleNote = (event) =>{
        
        setNewNote(event.target.value)
    }
    const showImportant = (id) =>{
        setNotes(notes.map(note =>
            note.id == id ? {...note, 
                important: !note.important} :note
        ))
    }
    const noteFiltered = showAll == true ? notes : notes.filter(note => note.important == true)
    return(
        <div>    
        <h1>Notes </h1>
        <button onClick={()=>
            setShowAll(!showAll)}>
            {showAll ? 'Show Important' : 'Show All'}
          </button>  
        
        <ul>
            {noteFiltered.map(note => (
            <li key={note.id}>
                {note.value}
            <button onClick={()=> showImportant(note.id)}>
                {note.important ? 'Unmark' : 'Mark'}

            </button>
            </li>
               
            ))}
        </ul>
        <form onSubmit={addNote}>
            <input type="text" value={newNote} onChange={handleNote}/>
            <button type="submit">Save</button>
            </form>
        </div>
    )
}
export default App