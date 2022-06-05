import express from "express"
import courseModel from "../models/courseModel.js"
import { createCourse } from "./../controllers/course.js"
const router = express.Router()

router.post("/course/createCourse", createCourse)
router.get("/course/getCourses", async (req, res) =>
  res.send(await courseModel.find().populate({path : "teacherId", select : "username"}))
)

export default router
