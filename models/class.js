import mongoose from "mongoose"
const { Schema } = mongoose

const scheme = mongoose.Schema(
  {
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "branch" },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],

    title: { type: String, required: true },
  },
  { timestamps: true }
)
export default mongoose.model("class", scheme)
