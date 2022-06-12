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
branchRoutes.post("/findAll", findAllBranch)

branchRoutes.post("/create", auth, createBranch)

branchRoutes.patch("/update/:id", auth, updateBranch)

branchRoutes.delete("/delete/:id", auth, deleteOneBranch)
