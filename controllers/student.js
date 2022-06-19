import User from "../models/user.js"
import bcrypt from "bcrypt"

export const createStudent = async (req, res) => {
  if ((await User.countDocuments({ email: req.body.email })) > 0)
    return res.status(500).send("Email déjà existante.")

  req.body.password = await bcrypt.hash(req.body.password, 10)

  let created = await new User(req.body).save()

  res.send(created)
}

export const findOneStudent = async (req, res) => {
  const { id } = req.params

  let found = await User.findById(id, req.body)

  res.send(found)
}

export const findAllStudent = async (req, res) => {
  let found = await User.find(
    { privilege: "Student" },
    "-password -token"
  ).sort({ createdAt: -1 })

  res.send(found)
}

export const updateStudent = async (req, res) => {
  const { id } = req.params
  delete req.body._id

  let user = await User.findById(id)

  if (user.email !== req.body.email)
    if ((await User.countDocuments({ email: req.body.email })) > 0)
      return res.status(500).send("Email déjà existante.")

  req.body.password = await bcrypt.hash(req.body.password, 10)

  let updated = await User.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { returnOriginal: false }
  )

  res.send(updated)
}

export const deleteOneStudent = async (req, res) => {
  const { id } = req.params

  await User.deleteOne({ _id: id })

  res.send("Delete success.")
}
