import mongoose from "mongoose"
const { Schema } = mongoose

const scheme = mongoose.Schema(
  {
    title: { type: String, required: true },
    department: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
  },
  { timestamps: true }
)
export default mongoose.model("class", scheme)
