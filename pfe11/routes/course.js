import express from "express"
import courseModel from "../models/courseModel.js"
import {
  addFilePath,
  createCourse,
  updateCourse,
} from "./../controllers/course.js"
import multer from "multer"
import fs from "fs"

const router = express.Router()

/* #region  File upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./courseFiles/${req.params.id}/${req.params.fileCategory}`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const fileFilter = async (req, file, cb) => {
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

router.post("/course/createCourse", createCourse)
router.get("/course/getCourses", async (req, res) =>
  res.send(
    await courseModel.find().populate({ path: "teacherId", select: "username" })
  )
)
router.patch("/course/updateCourse", updateCourse)

router.patch("/course/addFilePath/:id/:fileName", addFilePath)

router.post("/course/upload/:id/:fileCategory", upload.array("files", 5))
export default router
