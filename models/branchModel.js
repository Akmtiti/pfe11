import mongoose from "mongoose";
const { Schema } = mongoose;

const scheme = mongoose.Schema({
  name: { type: String, required: true},
  classes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'class' }],

});
export default mongoose.model("branch", scheme);
