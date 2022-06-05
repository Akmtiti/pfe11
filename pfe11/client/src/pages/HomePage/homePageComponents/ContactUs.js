import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import { Axios } from "../../../axios"
import StarRating from "../../../StarRating"

function ContactUs() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [feedback, setFeedback] = useState("")

  const submit = () => {
    Axios.post("/contactUs/createContactUs", {
      name: name,
      email: email,
      message: message,
    })
      .then((res) => {
        setFeedback("Votre message est envoyé.")
      })
      .catch((err) => {
        setFeedback("Vérifier votre contenu.")
      })
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <form id="contact-form" role="form">
              <div className="section-title">
                <h2>
                  Contact us <small>we love conversations. let us talk!</small>
                </h2>
              </div>
              <div className="col-md-12 col-sm-12">
                <input
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  name="name"
                  required=""
                />

                <input
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Enter email address"
                  name="email"
                  required=""
                />
                <textarea
                  onChange={(event) => setMessage(event.target.value)}
                  className="form-control"
                  rows="6"
                  placeholder="Tell us about your message"
                  name="message"
                  required=""
                ></textarea>
              </div>
              <div className="App">
                <StarRating />
              </div>
              <div className="col-md-4 col-sm-12">
                <input
                  onClick={submit}
                  type="button"
                  className="form-control"
                  name="send message"
                  value="Send Message"
                />
                          </div>
                          <p>{feedback} </p>
            </form>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="contact-image">
              <img
                src="assets/images/contact-image.jpg"
                className="img-responsive"
                alt="Smiling Two Girls"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
