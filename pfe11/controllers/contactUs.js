import contactUsModel from "../models/contactUsModel.js"

export const createContactUs = async (req, res) => {

  // let count = await contactUsModel.countDocuments({
  //   courseName: req.body.courseName,
  //   className: req.body.className,
  // })
  // if (count > 0) return res.status(500).send("Matière déjà existante.")

  contactUsModel.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send("Erreur Serveur.")
    } else {
      res.status(201).send()
    }
  })
}
