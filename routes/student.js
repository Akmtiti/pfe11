import express from "express"
import auth from "../middleware/auth.js"

import {
  findOneStudent,
  findAllStudent,
  createStudent,
  updateStudent,
  deleteOneStudent,
} from "../controllers/student.js"

export const studentRoutes = express.Router()

studentRoutes.get("/findOne/:id", findOneStudent)
studentRoutes.get("/findAll", findAllStudent)

studentRoutes.post("/create",  createStudent)

studentRoutes.patch("/update/:id",  updateStudent)

studentRoutes.delete("/delete/:id",  deleteOneStudent)

