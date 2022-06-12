import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { API } from "../../../axios"

const fetchedTeachers = [
  "Teacheer1 ",
  "Teacheer2 ",
  "Teacheer3 ",
  "Teacheer4 ",
  "Teacheer5 ",
]
function Teachers() {
  const [fetchedTeachers, setFetchedTeachers] = useState([])
  useEffect(async () => {
    setFetchedTeachers((await API.get("/user/getTeachers")).data)
  }, [])

  return (
    <section id="team">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="section-title">
              <h2>
                Teachers <small>Meet Professional Trainers</small>
              </h2>

              <Button href="/teachers" variant="link">Voir plus</Button>
            </div>

            <div className="owl-carousel owl-theme owl-courses">
              {renderTeachers()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  function renderTeachers() {
    return (
      <>
        {fetchedTeachers.map((teacher, key) => (
          <div key={key} className="col-md-8 col-sm-7">
            <div className="team-thumb">
              <div className="team-image">
                <img
                  src="assets/images/inconnue.jpg"
                  className="img-responsive"
                  alt=""
                />
              </div>
              <div className="team-info">
                <h4> {teacher.username} </h4>
                <span>I love Teaching</span>
              </div>
              <ul className="social-icon">
                <li>
                  <a
                    href="#"
                    className="fa fa-facebook-square"
                    attr="facebook icon"
                  ></a>
                </li>
                <li>
                  <a href="#" className="fa fa-twitter"></a>
                </li>
                <li>
                  <a href="#" className="fa fa-instagram"></a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </>
    )
  }
}
export default Teachers
