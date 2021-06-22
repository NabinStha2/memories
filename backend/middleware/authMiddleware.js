import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authorization = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //   console.log(token);
      const isCustomAuth = token.length < 500;

      if (token && isCustomAuth) {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.userId = decoded?.id;
        // console.log(req.user._id);
      } else {
        const decodedData = jwt.decode(token);
        // console.log(decodedData);
        req.userId = decodedData?.sub;
        // console.log(req.user);
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
      //   throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    // throw new Error("Not authorized, no token");
  }
};
