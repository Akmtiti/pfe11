import userModel from "../models/userModel.js"

export const createTeacher = async (req, res) => {

  let count = await userModel.countDocuments({ email: req.body.email })
  if (count > 0) return res.status(500).send("Email déjà existante.")

  req.body.privilege = "teacher"
  User.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send("Erreur Serveur.")
    } else {
      res.status(201).send()
    }
  })
}