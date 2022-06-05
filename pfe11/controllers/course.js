import courseModel from "../models/courseModel.js"

export const createCourse = async (req, res) => {


  let count = await courseModel.countDocuments({
    courseName: req.body.courseName,
    className: req.body.className,
  })
  if (count > 0) return res.status(500).send("Matière déjà existante.")

  courseModel.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send("Erreur Serveur.")
    } else {
      res.status(201).send()
    }
  })
}
