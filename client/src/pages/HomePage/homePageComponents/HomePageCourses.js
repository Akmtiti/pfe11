import Button from "react-bootstrap/Button"

import React, { useEffect, useState } from "react"
import { API } from "../../../api"
import { useSelector } from "react-redux"
// assets/images/mecan.jpg
// assets/images/inconnue.jpg
// assets/images/deeplr.jpg
// assets/images/inconnue.jpg
// assets/images/algbr.png
// assets/images/inconnue.jpg
// assets/images/Electromagnétisme.png
// assets/images/inconnue.jpg

const baseUrl = "http://localhost:8001/courseImages/"

const images = [
  "assets/images/deeplr.jpg",
  "assets/images/inconnue.jpg",
  "assets/images/algbr.png",
]

function Courses() {
  const { courses } = useSelector((state) => state.course)

  return (
    <section id="courses">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="section-title">
              <h2>
                Popular Courses{" "}
                <small>Upgrade your skills with newest courses</small>
              </h2>
              <Button href="/courses" variant="link">
                Voir plus
              </Button>
            </div>
            <div className="owl-carousel owl-theme owl-courses">
              {renderCourses()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  function renderCourses() {
    return courses.map((course, key) => (
      <div key={key} className="col-md-4 col-sm-4">
        <div className="item">
          <div className="courses-thumb">
            <div className="courses-top">
              <div className="courses-image">
                <img
                  src={images[key]}
                  width="200"
                  height="210"
                  alt=""
                />
              </div>
            </div>
            <div className="courses-detail">
              <h3>
                <a href="#"> {course.title} </a>
              </h3>
              <p>LISI-A03</p>
            </div>
            <div className="courses-info">
              <div className="courses-author">
                <img
                  src="assets/images/inconnue.jpg"
                  className="img-responsive"
                  alt=""
                />
                <span>{course?.teacherId?.username} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }
}

export default Courses
