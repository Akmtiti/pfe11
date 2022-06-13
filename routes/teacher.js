import express from "express"
import auth from "../middleware/auth.js"

import {
  findOneTeacher,
  findAllTeacher,
  createTeacher,
  updateTeacher,
  deleteOneTeacher,
} from "../controllers/teacher.js"

export const teacherRoutes = express.Router()

teacherRoutes.get("/findOne/:id", findOneTeacher)
teacherRoutes.get("/findAll", findAllTeacher)

teacherRoutes.post("/create",  createTeacher)

teacherRoutes.patch("/update/:id",  updateTeacher)

teacherRoutes.delete("/delete/:id",  deleteOneTeacher)

