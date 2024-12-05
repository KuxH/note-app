import { useEffect, useState } from "react"
import noteService from "../../services/notes"

const Note = ({ note, handleChange }) => {
  const label = note.important ? "make unimportant" : "make important"
  return (
    <li>
      {note.content} <button onClick={handleChange}>{label}</button>
    </li>
  )
}

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")

  useEffect(() => {
    noteService
      .getAll()
      .then((initNotes) => {
        setNotes(initNotes)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const noteObj = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    try {
      const note = await noteService.create(noteObj)
      setNotes(notes.concat(note))
      setNewNote("")
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((res) => {
        setNotes(notes.map((n) => (n.id === id ? res : n)))
      })
      .catch((err) => {
        alert(`The note "${note.content}" was already deleted from the server.`)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={handleSubmit}>
        Note:
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          type="text"
        />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleChange={() => handleChange(note.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default Notes
