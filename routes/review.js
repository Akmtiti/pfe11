import express from "express"
import { createReview } from "../controllers/review.js"
import reviewModel from "../models/reviewModel.js"
const router = express.Router()

router.post("/review/createReview", createReview)
router.get("/review/getReviews", async (req, res) =>
  res.send(await reviewModel.find().populate({path : "studentId courseId", select : "username courseName"}))
)

export default router
