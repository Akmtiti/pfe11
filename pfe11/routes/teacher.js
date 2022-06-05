import express from "express"
const router = express.Router()

import userModel from "../models/userModel.js"
import { createTeacher } from "./../controllers/teacher.js"

router.post("/user/createTeacher", createTeacher)
router.get("/user/getTeachers", async (req, res) =>
  res.send(await userModel.find({ privilege: "teacher" }, { password: 0 }))
)

export default router
