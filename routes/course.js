import express from "express"
import auth from "../middleware/auth.js"

import {
  addFilePath,
  createCourse,
  findOneCourse,
  findAllCourse,
  updateCourse,
  deleteOneCourse,deleteUpload, searchFile, fetchAllFiles
} from "../controllers/course.js"

import multer from "multer"
import fs from "fs"

export const CourseRoutes = express.Router()

/* #region  File upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./courseFiles/${req.query.id}/${req.query.fileCategory}`)
    req.res.send()
  },
  filename: function (req, file, cb) {
    file.originalname = replaceAll(file.originalname, " ", "_")

    cb(null, file.originalname)
  },
})
const fileFilter = async (req, file, cb) => {
  const directories = [
    `./courseFiles/${req.query.id}`,
    `./courseFiles/${req.query.id}/${req.query.fileCategory}`,
  ]
  
  directories.forEach(async (directory) => {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory)
    }
  })
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



CourseRoutes.get("/findOne/:id", findOneCourse)
CourseRoutes.get("/findAll", findAllCourse)
CourseRoutes.get("/getAllFiles", fetchAllFiles)

CourseRoutes.post("/create", createCourse)
CourseRoutes.post("/upload", upload.array("files", 5))
CourseRoutes.post("/deleteUpload", deleteUpload)
CourseRoutes.post("/searchFile", searchFile)
// searchFile()


CourseRoutes.patch("/update/:id", updateCourse)
CourseRoutes.patch("/addFilePath/:id/", addFilePath)

CourseRoutes.delete("/delete/:id", deleteOneCourse)

function replaceAll(string, search, replace) {
  return string.split(search).join(replace)
}
