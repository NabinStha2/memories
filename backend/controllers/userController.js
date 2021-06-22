import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        userExists.password
      );
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Password incorrect!" });

      const token = jwt.sign(
        { email: userExists.email, id: userExists._id },
        process.env.TOKEN_SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      // console.log(userExists);
      res.status(200).json({ userProfile: userExists, userToken: token });
    } else {
      res.status(404).json({ message: "User not found with this email." });
    }
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password don't match!" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be of 6 length!" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });

      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        process.env.TOKEN_SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      // console.log(newUser);
      res.status(200).json({ userProfile: newUser, userToken: token });
    } else {
      res.status(400).json({ message: "User already exists with this email." });
    }
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
