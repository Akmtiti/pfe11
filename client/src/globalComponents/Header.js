import { Stack } from "@mui/material"
import React from "react"
import Search from "../search"

const currentUser = JSON.parse(localStorage.getItem("currentUser"))
function Header() {
  return (
    <section
      className="navbar custom-navbar navbar-fixed-top"
      role="navigation"
    >
      <div className="container">
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
            {" "}
            <img
              src="http://www.issatso.rnu.tn/fo/images/logo.png"
              alt="logo"
              width="80"
            ></img>{" "}
          </a>
        </div>

        <div className="collapse navbar-collapse">
          <ul
            style={{ width: "100%" }}
            className="nav navbar-nav navbar-nav-first"
          >
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
            {/* {currentUser?.privilege === "admin" && ( */}
              <li>
                <a href="/admin">
                  <i className="smoothScroll"></i> Admin page
                </a>
              </li>
            {/* )} */}
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
            {/* {currentUser?.privilege === "Teacher" && ( */}
              <li>
                <a href="/uploadCourse">
                  <i className="smoothScroll"></i> Uplaod Page
                </a>
              </li>
            {/* )} */}
          </ul>

          {/* <div className="search bar">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Search />
          </div> */}
          {currentUser && (
            <div style={{ whiteSpace: "nowrap" }}>
              Utilisateur connecté : {currentUser}{" "}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Header
