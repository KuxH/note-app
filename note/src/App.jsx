import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./components/pages/Home"
import Notes from "../src/components/pages/Notes"
import Users from "../src/components/pages/Users"
import noteService from "./services/notes"

const App = () => {
  const padding = {
    padding: 5,
  }

  return (
    <Router>
      <nav>
        <div>
          <Link style={padding} to="/">
            Home
          </Link>
          <Link style={padding} to="/notes">
            Notes
          </Link>
          <Link style={padding} to="/users">
            Users
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/users/*" element={<Users />} />
      </Routes>

      <div>
        <i>Note App, kushal 2024</i>
      </div>
    </Router>
  )
}

export default App
