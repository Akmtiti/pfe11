import User from "../models/user.js"

export const createTeacher = async (req, res) => {
  let created = await new User(req.body).save()

  res.send(created)
}

export const findOneTeacher = async (req, res) => {
  const { id } = req.params

  let found = await User.findById(id, req.body)

  res.send(found)
}

export const findAllTeacher = async (req, res) => {

  let found = await User.find({privilege : "Teacher"}, "-password -token")


  res.send(found)
}

export const updateTeacher = async (req, res) => {
  const { id } = req.params

  delete req.body._id

  let updated = await User.findOneAndUpdate(
    {_id : id},
    { $set: req.body },
    { returnOriginal: false }
  )

  res.send(updated)
}

export const deleteOneTeacher = async (req, res) => {
  const { id } = req.params

  await User.deleteOne({_id :id})

  res.send("Delete success.")
}
