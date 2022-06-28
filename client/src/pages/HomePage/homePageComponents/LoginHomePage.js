import React, { useEffect, useState } from "react"
import { API } from "../../../api"
import Button from "react-bootstrap/Button"
import { useDispatch } from "react-redux"
import { signin } from "../../../store/actions/auth"

function Login() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const [feedback, setFeedback] = useState("")

  const handleForm = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submit = async () => {
    try {
      await dispatch(signin(formData))
      setFeedback("Connecté.")
    } catch (error) {
      setFeedback("Erreur lors de la connection.")
    }
  }

  return (
    <div className="col-md-offset-1 col-md-4 col-sm-12">
      <div className="entry-form">
        <h2>SIGN IN </h2>
        <input
          onChange={handleForm}
          type="email"
          name="email"
          className="form-control"
          placeholder="Your email address"
          required=""
        />
        <input
          onChange={handleForm}
          type="password"
          name="password"
          className="form-control"
          placeholder="Your password"
          required=""
        />
        <button
          onClick={submit}
          className="submit-btn form-control"
          id="form-submit"
        >
          Login
        </button>
        <p>{feedback}</p>
        <Button href="/forgot_password" variant="link">
          Forget password
        </Button>
        <Button
          onClick={() =>
            dispatch(signin({ email: "admin@gmail.com", password: "admin" }))
          }
        >
          Admin login
        </Button>
        <Button
          onClick={() =>
            dispatch(
              signin({ email: "professeur1@gmail.com", password: "1111" })
            )
          }
        >
          Teacher login
        </Button>
        <Button
          onClick={() =>
            dispatch(
              signin({ email: "guess.nour1965@gmail.com", password: "1111" })
            )
          }
        >
          Student login
        </Button>
      </div>
    </div>
  )
}

export default Login
