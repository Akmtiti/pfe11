import React, { useState, useEffect } from "react"

function ForgotPasswordPage() {
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
                  />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Reset Password
                  </button>
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
