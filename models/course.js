import mongoose from "mongoose"
const { Schema } = mongoose

const courseScheme = mongoose.Schema({
  title: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "class" },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  filesPath: [String],
})
export default mongoose.model("course", courseScheme)
