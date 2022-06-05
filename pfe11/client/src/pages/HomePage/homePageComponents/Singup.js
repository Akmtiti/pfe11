import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { Axios } from "../../../axios"

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [feedback, setFeedback] = useState("")

  const submit = () => {
    if (password !== confirmPassword)
      return setFeedback("Mot de passe non identique.")

    Axios.post("/user/singup", {
      username: name,
      email: email,
      password: password,
      privilege: "student",
    })
      .then((res) => {
        setFeedback("Compte créé.")
      })
      .catch((err) => {
        setFeedback(
          err.response.data || "Erreur lors de la création de compte."
        )
      })
  }

  return (
    <div className="col-md-offset-1 col-md-4 col-sm-12">
      <div className="entry-form">
        <h2>SIGN UP</h2>
        <input
          onChange={(event) => setName(event.target.value)}
          type="text"
          name="full name"
          className="form-control"
          placeholder="Full name"
          required=""
        />
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          name="email"
          className="form-control"
          placeholder="Your email address"
          required=""
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          required=""
        />
        <input
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
          name="password"
          className="form-control"
          placeholder="Confirm password"
          required=""
        />
        <button
          onClick={submit}
          className="submit-btn form-control"
          id="form-submit"
        >
          Get started
        </button>
        {feedback}
      </div>
    </div>
  )
}

export default Signup
