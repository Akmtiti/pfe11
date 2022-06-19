import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import {  useSearchParams } from "react-router-dom"
import { resetPassword } from "../../api"

function ResetPasswordPage() {
  let [searchParams, setSearchParams] = useSearchParams()
  const [formData, setFormData] = useState({})
  const [feedback, setFeedback] = useState("")

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const submit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword)
      return setFeedback("Mot de passe non identique.")

    try {
      await resetPassword({
        ...formData,
        token: searchParams.get("token"),
      })
      setFeedback(
        "Mot de passe réinitialisé avec succès. Vous pouvez vous connecter."
      )
      setTimeout(() => {
        window.location.href = "/";

      }, 3000);
    } catch (error) {
      setFeedback("Erreur lors de la connection.")
    }
  }

  return (
    <div>
      <div className="container login-container">
        <div className="row forget-password-container">
          <div className="login-form">
            <div className="login_form_in">
              <div className="auth_branding">
                <a className="auth_branding_in" href="https://procraft.studio">
                  <img
                    src="https://res.cloudinary.com/procraftstudio/image/upload/v1613964589/Procraft-Studio-Logo-1_tnfxuj.jpg"
                    alt="Procraft Studio"
                  />
                </a>
              </div>
              <h1 className="auth_title text-left">Password Reset</h1>
              <form>
                <div
                  className="alert alert-success bg-soft-primary border-0"
                  role="alert"
                >
                  Enter your new password.
                </div>
                <div className="form-group">
                  <input
                    style={{ marginBottom: "1rem" }}
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={submit}
                  >
                    Reset Password
                  </button>
                  {feedback && <p>{feedback}</p>}
                </div>
                <div className="form-group other_auth_links">
                  <a className href="/">
                    Home
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <img
        className="triangleB"
        src="https://res.cloudinary.com/procraftstudio/image/upload/v1613965232/triangleB_isffjy.png"
        alt="Onestop triangle"
      />
    </div>
  )
}

export default ResetPasswordPage
