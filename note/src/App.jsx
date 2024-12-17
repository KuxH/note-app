import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom"
import Home from "./components/pages/Home"
import Notes from "../src/components/pages/Notes"
import Login from "./components/pages/Login.jsx"
import Users from "../src/components/pages/Users"
import { useState, useEffect } from "react"
import noteService from "./services/notes"
import { Nav, Navbar } from "react-bootstrap"

const App = () => {
  const [user, setUser] = useState("")
  const [errMessage, setErrMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const padding = {
    padding: 5,
  }

  const Notification = ({ message }) =>
    message ? <p style={{ color: "red" }}>{message}</p> : null
  const logOut = () => {
    window.localStorage.clear()
    noteService.setToken(null)
    setUser(null)
  }

  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
        <Navbar.Toggle aria-controls="nav-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/notes">
                Notes
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                Users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {
                user ? (
                  <span>
                    {user.name} logged in
                    <button onClick={logOut}>Logout</button>
                  </span>
                ) : (
                  <Link style={padding} to="/login">
                    Login
                  </Link>
                )
                // <Link style={padding} to="/register">
                //   Register
                // </Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Notification message={errMessage} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/notes"
            element={user ? <Notes /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/login"
            element={
              !user ? (
                <Login setUser={setUser} setErrMessage={setErrMessage} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
        </Routes>
      </div>

      <footer>
        <div className="footer">
          <i>Note App, kushal 2024</i>
        </div>
      </footer>
    </Router>
  )
}

export default App
