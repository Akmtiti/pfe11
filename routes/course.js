import express from "express"
import auth from "../middleware/auth.js"

import {
  addFilePath,
  createCourse,
  findOneCourse,
  findAllCourse,
  updateCourse,
  deleteOneCourse,
} from "../controllers/course.js"

import multer from "multer"
import fs from "fs"

export const CourseRoutes = express.Router()

/* #region  File upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./courseFiles/${req.params.id}/${req.params.fileCategory}`)
    req.res.send()
  },
  filename: function (req, file, cb) {
    file.originalname = replaceAll(file.originalname, " ", "_")

    cb(null, file.originalname)
  },
})
const fileFilter = async (req, file, cb) => {
  console.log(file)
  console.log(req.params.fileCategory)
  console.log(req.params.id)
  const directories = [
    `./courseFiles/${req.params.id}`,
    `./courseFiles/${req.params.id}/${req.params.fileCategory}`,
  ]
  directories.forEach(async (directory) => {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory)
    }
  })

  // console.log(file)
  cb(null, true)
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50, //50MB
  },
  fileFilter: fileFilter,
})

/* #endregion */
// Get

CourseRoutes.get("/findOne/:id", findOneCourse)
CourseRoutes.get("/findAll", findAllCourse)

CourseRoutes.post("/create", createCourse)
CourseRoutes.post("/upload/:id/:fileCategory", upload.array("files", 5))

CourseRoutes.patch("/update/:id", updateCourse)
CourseRoutes.patch("/addFilePath/:id/", addFilePath)

CourseRoutes.delete("/delete/:id", deleteOneCourse)

function replaceAll(string, search, replace) {
  return string.split(search).join(replace)
}
