import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

export async function sendEmail(mailForm) {
  mailForm.from = "mourali.akram@gmail.com"

  try {
    await transporter.sendMail(mailForm)
    console.log(" Email sent: " + mailForm.to)
  } catch (error) {
    console.log(error)
  }
}
