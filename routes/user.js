import express from "express"
const router = express.Router()
import bcrypt from "bcrypt"

import {
  deleteUser,
  modifyUser,
  changePassword,
  signUp,
  login,
  getFields,
  addEditUser,
  forgotPassword,
  resetPassword,
} from "../controllers/user.js"
import userModel from "../models/user.js"

// ;(async () => {
//   const admin = new userModel({
//     username: "admin",
//     password: await bcrypt.hash("admin", 10),
//     email: "admin@gmail.com",
//     privilege: "Admin",
//   })
//   await admin.save()
// })()

router.put("/addEditUser", addEditUser)

router.post("/changePassword", changePassword)
router.post("/modifyUser", modifyUser)

router.get("/getFields", getFields)
router.get("/getUsers", async (req, res) =>
  res.send(await userModel.find())
)
router.get("/getTeachers", async (req, res) =>
  res.send(await userModel.find({ privilege: "Teacher" }, "-password"))
)

router.post("/singup", signUp)
router.post("/login", login)
router.post("/forgotPassword", forgotPassword)
router.post("/resetPassword", resetPassword)

router.delete("/deleteUser/:id", deleteUser)

export default router
