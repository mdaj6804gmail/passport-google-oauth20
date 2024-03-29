import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  googleId: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
});

const User = model("User", userSchema);

export default User;
