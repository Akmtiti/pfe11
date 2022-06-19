import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { forgotPassword } from "../../api"

function ForgotPasswordPage() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const [feedback, setFeedback] = useState("")

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const submit = async (e) => {
    e.preventDefault()

    try {
      await forgotPassword({ email: formData.email })
      setFeedback(
        "Un email vous a été envoyé pour réinitialiser votre mot de passe."
      )
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
                  Enter your email address and we'll send you an email with
                  instructions to reset your password.
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email Address"
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

export default ForgotPasswordPage
