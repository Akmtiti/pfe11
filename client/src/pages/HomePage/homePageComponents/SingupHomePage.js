import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { API, signIn } from "../../../api"

function SingupHomePage() {
  const [formData, setFormData] = useState({})
  const [feedback, setFeedback] = useState("")

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submit = async () => {
    if (formData.password !== formData.confirmPassword)
      return setFeedback("Mot de passe non identique.")

    try {
      await signIn({ ...formData, privilege: "Student" })
    } catch (error) {
      setFeedback(
        error.response.data || "Erreur lors de la création de compte."
      )
    }
  }

  return (
    <div className="col-md-offset-1 col-md-4 col-sm-12">
      <div className="entry-form">
        <h2>SIGN UP</h2>
        <input
          onChange={handleChange}
          type="text"
          name="full name"
          className="form-control"
          placeholder="Full name"
          required
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          className="form-control"
          placeholder="Your email address"
          required
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          required
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          className="form-control"
          placeholder="Confirm password"
          required
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

export default SingupHomePage
