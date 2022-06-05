import mongoose from "mongoose";
const { Schema } = mongoose;

const scheme = mongoose.Schema({
  name: { type: String, required: true},
  level: { type: String, required: true},
  courses: [ { type: mongoose.Schema.Types.ObjectId, ref: 'course' }],

});
export default mongoose.model("class", scheme);
