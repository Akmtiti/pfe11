import User from "../models/user.js"
import bcrypt from "bcrypt"

export const createTeacher = async (req, res) => {
  if ((await User.countDocuments({ email: req.body.email })) > 0)
    return res.status(500).send("Email déjà existante.")

  req.body.password = await bcrypt.hash(req.body.password, 10)

  let created = await new User(req.body).save()

  res.send(created)
}

export const findOneTeacher = async (req, res) => {
  const { id } = req.params

  let found = await User.findById(id, req.body)

  res.send(found)
}

export const findAllTeacher = async (req, res) => {
  let found = await User.find({ privilege: "Teacher" }, "-password -token")

  res.send(found)
}

export const updateTeacher = async (req, res) => {
  const { id } = req.params
  delete req.body._id

  const { _id, email, password, username } = req.body

  if (password) req.body.password = await bcrypt.hash(password, 10)

  let updated = await User.findByIdAndUpdate(id, req.body, {
    returnOriginal: false,
  })

  res.send(updated)
}

export const deleteOneTeacher = async (req, res) => {
  const { id } = req.params

  await User.deleteOne({ _id: id })

  res.send("Delete success.")
}
