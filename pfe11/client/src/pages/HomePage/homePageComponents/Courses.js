import Button from "react-bootstrap/Button"

import React, { useEffect, useState } from "react"
import { Axios } from "../../../axios"
// assets/images/mecan.jpg
// assets/images/inconnue.jpg
// assets/images/deeplr.jpg
// assets/images/inconnue.jpg
// assets/images/algbr.png
// assets/images/inconnue.jpg
// assets/images/Electromagnétisme.png
// assets/images/inconnue.jpg

const baseUrl = "http://localhost:8001/courseImages/"

const fetchedCourses = [
  { title: "Mat1", teacher: "Prof1", image: "assets/images/mecan.jpg" },
  {
    title: "Mat2",
    teacher: "Prof2",
    image: "assets/images/Electromagnétisme.png",
  },
  { title: "Mat3", teacher: "Prof3", image: "assets/images/deeplr.jpg" },
  { title: "Mat4", teacher: "Prof4", image: "assets/images/inconnue.jpg" },
  { title: "Mat5", teacher: "Prof5", image: "assets/images/algbr.png" },
] // {
//   "_id": "627caf92946021847420b826",
//   "courseName": "Physique 4",
//   "classNameName": "LISI 2",
//   "imagePath": "image0.png",
//   "teacherId": "627c06b7c9c8f5fe02d3a0d4",
//   "__v": 0
// }
function Courses() {
  const [fetchedCourses, setFetchedCourses] = useState([])

  useEffect(async () => {
    setFetchedCourses((await Axios.get("/course/getCourses")).data)
  }, [])
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
              <Button variant="link">Voir plus</Button>
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
    return fetchedCourses.map((course, key) => (
      <div key={key}  className="col-md-4 col-sm-4">
        <div className="item">
          <div className="courses-thumb">
            <div className="courses-top">
              <div className="courses-image">
                <img
                  src={baseUrl + course.imagePath}
                  width="200"
                  height="210"
                  alt="" />
              </div>
            </div>
            <div className="courses-detail">
              <h3>
                <a href="#"> {course.courseName} </a>
              </h3>
              <p>LISI-A03</p>
            </div>
            <div className="courses-info">
              <div className="courses-author">
                <img
                  src="assets/images/inconnue.jpg"
                  className="img-responsive"
                  alt="" />
                <span>{course.teacherId.username} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }
}

export default Courses
