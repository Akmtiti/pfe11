import mongoose from "mongoose";
const { Schema } = mongoose;

const scheme = mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true },
  message: { type: String , required: true },

});
export default mongoose.model("contactus", scheme);
