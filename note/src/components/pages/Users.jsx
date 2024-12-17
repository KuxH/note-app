import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import loginService from "../../services/login"
import noteService from "../../services/notes"
import userService from "../../services/user"
import login from "../../services/login"

const Users = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

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
    <div className="mt-4">
      <h1 className="mt-2">User Page</h1>

      {user ? (
        <div>
          <p>
            {user.name} logged in <button onClick={logOut}>Logout</button>
          </p>
        </div>
      ) : (
        <navigate>
          <Link style={padding} to="login">
            Login
          </Link>
          <Link style={padding} to="register">
            Register
          </Link>
        </navigate>
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
