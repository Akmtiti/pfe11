import mongoose from "mongoose"
const { Schema } = mongoose

const scheme = mongoose.Schema(
  {
    title: String,
    department: String,
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "class" }],
  },
  {
    timestamps: true,
  }
)
export default mongoose.model("branch", scheme)
