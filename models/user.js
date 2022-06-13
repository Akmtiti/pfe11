import mongoose from "mongoose";
const { Schema } = mongoose;

const userScheme = mongoose.Schema({
  username: { type: String, required: true,  },
  email: { type: String, unique: true, required: true,  },
  password: { type: String, required: true,  },
  passwordRecovery: {
    type: String,
    default: null,
  },
  privilege: { type: String, required: true }, // Teacher Student Admin


cin : String,
phone : String,
specialty : String,
rank : String,
description : String,


  token: { type: String, default: null },
  refreshToken: { type: String, default: null },
}, {timestamps: true})
export default mongoose.model("user", userScheme);
