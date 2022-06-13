import Course from "../models/course.js"

export const createCourse = async (req, res) => {
  if ((await Course.countDocuments({ title: req.body.title })) > 0)
    return res.status(500).send("Course already exists")

  let created = await new Course(req.body).save()

  created = await created.populate("classId")
  created = await created.populate("teacherId")

  res.send(created)
}

export const updateCourse = async (req, res) => {
  const { id } = req.params

  res.send()
}

export const addFilePath = async (req, res) => {
  const { id } = req.params
  var { path } = req.body
  var path = replaceAll(path," ", "_");  


  await Course.updateOne({ _id: id }, { $addToSet: { filesPath: path } })

  res.send("Success")
}

export const findOneCourse = async (req, res) => {
  const { id } = req.params

  let found = await Course.findById(id, req.body)

  res.send(found)
}

export const findAllCourse = async (req, res) => {

  let found = await Course.find()

  res.send(found)
}

export const deleteOneCourse = async (req, res) => {
  const { id } = req.params

  await Course.deleteOne({ _id: id })

  res.send("Delete success.")
}
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}