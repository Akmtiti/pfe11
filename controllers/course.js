import Course from "../models/course.js"
import fs from "fs"

export const createCourse = async (req, res) => {
  if ((await Course.countDocuments({ title: req.body.title })) > 0)
    return res.status(500).send("Course already exists")

  let created = await new Course(req.body).save()

  // created = await created.populate("classId")
  created = await created.populate("teacherId")

  res.send(created)
}

export const updateCourse = async (req, res) => {
  const { id } = req.params

  delete req.body._id

  let updated = await Course.findOneAndUpdate({ _id: id }, req.body, {
    returnOriginal: false,
  })

  res.send(updated)
}

export const addFilePath = async (req, res) => {
  const { id } = req.params
  var { path } = req.body
  var path = replaceAll(path, " ", "_")

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
  return string.split(search).join(replace)
}

export const deleteUpload = async (req, res) => {
  const { id, filePath } = req.body

  try {
    fs.unlinkSync(`./courseFiles/${id}/${filePath}`)
    res.send()
  } catch (err) {
    console.log(err)
    res.send("File not found")
  }
}

export const searchFile = async (req, res) => {
  let x = await Course.find({}, "filesPath")

  let filesPaths = []

  x.map((elem) => filesPaths.push(elem.filesPath))

  var tp = [],
    td = [],
    exam = [],
    course = []

  filesPaths.map((path, key) => {
    path.map((fileName) => {
      let x = fileName.slice(0, fileName.indexOf("/"))
      switch (x) {
        case "TP":
          tp.push(fileName)
          break
        case "TD":
          td.push(fileName)
          break
        case "course":
          course.push(fileName)
          break
        case "exam":
          exam.push(fileName)
          break

        default:
          break
      }
    })
  })

  console.log(exam, tp, td, course)
  // res.send()
}

export const fetchAllFiles = async (req, res) => {
  let courses = await Course.find({}, "filesPath")

  let filesPaths = []
  var result = []

  courses.map((elem) => filesPaths.push(elem.filesPath))

  filesPaths.map((path, key) => {
    path.map((fileName) => {
      result.push(fileName)
      if (fileName.indexOf("/") > 0) {
        let x = fileName.slice(0, fileName.indexOf("/"))
        // console.log(x)
      }
    })
  })

  res.send(result)
}
