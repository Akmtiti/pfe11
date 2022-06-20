import { Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../api"

function Header() {
  const dispatch = useDispatch()
  const { authData } = useSelector((state) => state.auth)

  const navSwitch = () => {
    switch (authData?.privilege) {
      case "Teacher":
        return (
          <></>
          // <li>
          //   <a href="/search_courses">
          //     <i className="smoothScroll"></i> Search Courses
          //   </a>
          // </li>
        )

      case "Admin":
        return (
          <li>
            <a href="/admin">
              <i className="smoothScroll"></i> Admin page
            </a>
          </li>
        )

      default:
        break
    }
  }

  return (
    <section
      className="navbar custom-navbar navbar-fixed-top"
      role="navigation"
    >
      <div className="">
        <div className="collapse navbar-collapse">
          <ul
            style={{ width: "100%" }}
            className="nav navbar-nav navbar-nav-first"
          >
            <div className="navbar-header">
              <button
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span className="icon icon-bar"></span>
                <span className="icon icon-bar"></span>
                <span className="icon icon-bar"></span>
              </button>

              <a href="/" className="navbar-brand">
                <img
                  src="https://issatso.rnu.tn/assets/images/logo.png"
                  // src="http://www.issatso.rnu.tn/fo/images/logo.png"
                  alt="logo"
                  width="80"
                ></img>{" "}
              </a>
            </div>
            {window.location.pathname  == "/" && (
              <>
                <li>
                  <a href="#top" className="smoothScroll">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#team" className="smoothScroll">
                    Our Teachers
                  </a>
                </li>
                <li>
                  <a href="#courses" className="smoothScroll">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#contact" className="smoothScroll">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#testimonial" className="smoothScroll">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#login">
                    <i className="smoothScroll"></i> Login
                  </a>
                </li>
              </>
            )}
            <li>
              <a href="/teachers">
                <i className="smoothScroll"></i> Teachers Page
              </a>
            </li>
            <li>
              <a href="/courses">
                <i className="smoothScroll"></i> Courses Page
              </a>
            </li>
              <li>
            <a href="/search_courses">
              <i className="smoothScroll"></i> Search Courses
            </a>
          </li>

            {navSwitch()}
            {authData && (
              <li onClick={() => dispatch({ type: "LOGOUT" })}>
                <a href="/">
                  <i className="smoothScroll"></i> Déconnexion
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Header
