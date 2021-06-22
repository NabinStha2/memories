import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name must not be empty"] },
  email: {
    type: String,
    required: [true, "email must not be empty"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password must not be empty"],
    minLength: [6, "password must be of length six"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
