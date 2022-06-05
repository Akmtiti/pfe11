import reviewModel from "../models/reviewModel.js"
import userModel from "../models/userModel.js"

export const createReview = async (req, res) => {

  let count = await reviewModel.countDocuments({
    studentId: req.body.studentId,
    courseId: req.body.courseId,
  })
  if (count > 0) return res.status(500).send("Revue déjà existante.")

  reviewModel.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send("Erreur Serveur.")
    } else {
      res.status(201).send()
    }
  })
}
