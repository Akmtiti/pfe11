import Class from "../models/class.js"

export const createClass = async (req, res) => {
  let created = await new Class(req.body).save()

  res.send(created)
}

export const findOneClass = async (req, res) => {
  const { id } = req.params

  let found = await Class.findById(id, req.body)

  res.send(found)
}

export const findAllClass = async (req, res) => {
  const { filters = {}, fields = {} } = req.body

  let found = await Class.find(filters, fields)

  // delete found._doc.password
  // delete found._doc.accessToken
  // delete found._doc.refreshToken

  res.send(found)
}

export const updateClass = async (req, res) => {
  const { id } = req.params

  delete req.body._id

  let updated = await Class.findOneAndUpdate(
    {_id : id},
    { $set: req.body },
    { returnOriginal: false }
  )

  res.send(updated)
}

export const deleteOneClass = async (req, res) => {
  const { id } = req.params

  await Class.deleteOne({_id :id})

  res.send("Delete success.")
}
