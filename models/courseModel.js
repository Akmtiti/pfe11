import mongoose from "mongoose";
const { Schema } = mongoose;

const courseScheme = mongoose.Schema({
  courseName: { type: String, required: true},
  className: { type: String, required: true },
  
  imagePath: { type: String },
  filesPath:  [String] ,
  teacherId : {type: mongoose.Schema.Types.ObjectId, ref: 'user'}

});
export default mongoose.model("course", courseScheme);
