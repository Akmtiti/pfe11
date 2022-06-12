import Branch from "../models/branch.js"

export const createBranch = async (req, res) => {
  console.log(req.body)
  let created = await new Branch(req.body).save()

  res.send(created)
}

export const findOneBranch = async (req, res) => {
  const { id } = req.params

  let found = await Branch.findById(id, req.body)

  res.send(found)
}

export const findAllBranch = async (req, res) => {
  const { filters = {}, fields = {} } = req.body

  let found = await Branch.find(filters, fields)

  // delete found._doc.password
  // delete found._doc.accessToken
  // delete found._doc.refreshToken

  res.send(found)
}

export const updateBranch = async (req, res) => {
  const { id } = req.params

  delete req.body._id

  let updated = await Branch.findOneAndUpdate(
    {_id : id},
    { $set: req.body },
    { returnOriginal: false }
  )

  res.send(updated)
}

export const deleteOneBranch = async (req, res) => {
  const { id } = req.params

  await Branch.deleteOne({_id :id})

  res.send("Delete success.")
}
