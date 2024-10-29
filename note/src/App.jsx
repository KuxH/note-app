import { useState } from "react"

const App =() =>{
    const [notes,setNotes] = useState([]) 
    const[newNote, setNewNote] = useState('')
    const [showAll,setShowAll] = useState(true)
    const addNote= (event) =>{
        event.preventDefault()
        console.log(event.target.value)
    const noteObj ={
        id: notes.length +1,
        value: newNote,
        important: false
    }
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