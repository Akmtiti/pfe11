import mongoose from "mongoose"
const { Schema } = mongoose

const scheme = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  reviewMessage: { type: String, required: true },
  rating: { type: Number, required: true }, // Rating can be 1 2 3 4 5
})
export default mongoose.model("review", scheme)
