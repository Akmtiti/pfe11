import express from "express"
const router = express.Router()

import {
  deleteUser,
  modifyUser,
  changePassword,
  signUp,
  login,
  getFields,
  addEditUser,
} from "../controllers/user.js"
import userModel from "../models/userModel.js"

router.put("/user/addEditUser", addEditUser)

router.post("/changePassword", changePassword)
router.post("/modifyUser", modifyUser)

router.get("/user/getFields", getFields)
router.get("/user/getUsers", async (req, res) =>
  res.send(await userModel.find())
)

router.post("/user/singup", signUp)
router.post("/user/login", login)

router.delete("/user/deleteUser/:id", deleteUser)

export default router
