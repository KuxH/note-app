import { useEffect, useState } from "react"
import noteService from "../../services/notes"
import loginService from "../../services/login"
import { Table, Form, Button } from "react-bootstrap"

const Note = ({ note, handleChange }) => {
  const label = note.important ? "make unimportant" : "make important"
  return (
    <p>
      {note.content}
      {""}
    </p>
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
    } catch(ex){ setErrMessage("Can't create Note")
      setTimeout(() => {
        setErrMessage(null)
      }, 5000)}
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
    <div className="mt-4">
      <h1 className="my-2">Notes</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Enter a new note</Form.Label>
        <Form.Control
          name="note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          type="text"
        />
        <Button className="mt-2" variant="primary" type="submit">
          Create
        </Button>
      </Form>
      <Table stripe size="sm">
        <thead>
          <tr>
            <th>Content</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.content}</td>
              <td>{note.user ? note.user.name : "unknown"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Notes
