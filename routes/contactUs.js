import express from "express"
import contactUsModel from "../models/contactUsModel.js"
import { createContactUs } from './../controllers/contactUs.js';
const router = express.Router()

router.post("/contactUs/createContactUs", createContactUs)
router.get("/contactUs/getContactUs", async (req, res) =>
  res.send(await contactUsModel.find())
)

export default router 
