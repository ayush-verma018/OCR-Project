import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  idNumber: {
    type: String,
  },
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  doBirth: {
    type: String,
  },
  doIssue: {
    type: String,
  },
  doExpiry: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
