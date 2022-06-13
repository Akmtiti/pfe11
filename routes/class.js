import express from "express"
import auth from "../middleware/auth.js"

import {
  findOneClass,
  findAllClass,
  createClass,
  updateClass,
  deleteOneClass,
} from "../controllers/class.js"

export const classRoutes = express.Router()

classRoutes.get("/findOne/:id", findOneClass)
classRoutes.post("/findAll", findAllClass)

classRoutes.post("/create",  createClass)

classRoutes.patch("/update/:id",  updateClass)

classRoutes.delete("/delete/:id",  deleteOneClass)

