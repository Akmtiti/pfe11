import express from "express"
import auth from "../middleware/auth.js"

import {
  findOneBranch,
  findAllBranch,
  createBranch,
  updateBranch,
  deleteOneBranch,
} from "../controllers/branch.js"

export const branchRoutes = express.Router()

branchRoutes.get("/findOne/:id", findOneBranch)
branchRoutes.get("/findAll", findAllBranch)

branchRoutes.post("/create",  createBranch)

branchRoutes.patch("/update/:id",  updateBranch)

branchRoutes.delete("/delete/:id",  deleteOneBranch)
