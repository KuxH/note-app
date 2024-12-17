import { useState } from "react"
import loginService from "../../services/login"
import noteService from "../../services/notes"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { use } from "react"

const Login = ({ setUser, setErrMessage }) => {
  const Navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
      Navigate("/notes")
    } catch (e) {
      setErrMessage("Invalid username or password")
      setTimeout(() => {
        setErrMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="mt-4">
      <h2 className="mt-2">Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button className="mt-2" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login
