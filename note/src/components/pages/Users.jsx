import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import loginService from "../../services/login"
import noteService from "../../services/notes"
import userService from "../../services/user"

const Users = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [user, setUser] = useState(null)
  const [errMessage, setErrMessage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      navigate("/")
    } catch (e) {
      setErrMessage("Invalid username or password")
      setTimeout(() => {
        setErrMessage(null)
      }, 5000)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const newUser = { username, name, password }
      await userService.register(newUser)
      setErrMessage("User Registered")
      setUsername("")
      setName("")
      setPassword("")
      navigate("/login")
    } catch (e) {
      setErrMessage(e.response?.data?.error || "Registration failed.")
      setTimeout(() => {
        setErrMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.clear()
    noteService.setToken(null)
    setUser(null)
    navigate("/login")
  }

  const Notification = ({ message }) =>
    message ? <p style={{ color: "red" }}>{message}</p> : null

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <h1>User Page</h1>
      <Notification message={errMessage} />
      {user ? (
        <div>
          <p>
            {user.name} logged in <button onClick={logOut}>Logout</button>
          </p>
        </div>
      ) : (
        <nav>
          <Link style={padding} to="login">
            Login
          </Link>
          <Link style={padding} to="register">
            Register
          </Link>
        </nav>
      )}

      <Routes>
        <Route
          path="login"
          element={
            <div>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <div>
                  Username:
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit">Login</button>
              </form>
            </div>
          }
        />
        <Route
          path="register"
          element={
            <div>
              <h2>Register</h2>
              <form onSubmit={handleRegister}>
                <div>
                  Username:
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  Name:
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit">Register</button>
              </form>
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default Users
