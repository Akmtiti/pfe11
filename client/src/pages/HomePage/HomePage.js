import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Search from "../../globalComponents/search"
import StarRating from "../../globalComponents/StarRating.js"
import SingupHomePage from "./homePageComponents/SingupHomePage"
import Login from "./homePageComponents/LoginHomePage"
import Teachers from "./homePageComponents/Teachers"
import Courses from "./homePageComponents/HomePageCourses"
import ContactUs from "./homePageComponents/ContactUs"
import StudentReview from "./homePageComponents/StudentReviewHomePage"
import { Link } from "react-router-dom"
import Header from "../../globalComponents/Header"
import Footer from "../../globalComponents/Footer"

function HomePage() {
  return (
    <div>
      <section className="preloader">
        <div className="spinner">
          <span className="spinner-rotate"></span>
        </div>
      </section>

      <Header />

      <section id="home">
        <div className="row">
          <div className="owl-carousel owl-theme home-slider">
            <div className="item item-first">
              <div className="caption">
                <div className="container">
                  <div className="col-md-6 col-sm-12">
                    <h1>Distance Learning Education </h1>
                    <h3>
                      Our online courses are designed to help students in their
                      subjects with latest technologies.
                    </h3>
                    <a
                      href="#feature"
                      className="section-btn btn btn-default smoothScroll"
                    >
                      Discover more
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="item item-second">
              <div className="caption">
                <div className="container">
                  <div className="col-md-6 col-sm-12">
                    <h1>Start your journey with our practical courses</h1>
                    <h3>
                      Our courses are built in partnership with your teachers
                      and are designed to facilitate your .
                    </h3>
                    <a
                      href="#courses"
                      className="section-btn btn btn-default smoothScroll"
                    >
                      Take a course
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="item item-third">
              <div className="caption">
                <div className="container">
                  <div className="col-md-6 col-sm-12">
                    <h1>Talk with us!</h1>
                    <h3>
                      {" "}
                      Don't hesitate to ask an'y question at any time, we are
                      here to help you.{" "}
                    </h3>
                    <a
                      href="#contact"
                      className="section-btn btn btn-default smoothScroll"
                    >
                      Let's chat
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <Login />
            </div>
            <SingupHomePage />
          </div>
        </div>
      </section>
      <Teachers />

      <Courses />

      <StudentReview />

      <ContactUs />
    </div>
  )
}

export default HomePage
