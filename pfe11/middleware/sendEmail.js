import User from "../models/user.js"
import nodemailer from "nodemailer"

var transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  auth: {
    user: "contact@iber-conseils.com",
    pass: "Grissa1906",
  },
})

// export async function sendEmail(to, subject, text) {
export async function sendEmail(req, res) {
  var mailOptions = req.mailForm

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log(subject, " Email sent: " + req.mailForm.to)
    }
  })
}


// from: "contact@iber-conseils.com",
// to: to,
// subject: subject,
// html: text,
