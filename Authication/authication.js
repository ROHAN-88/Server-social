import jwt from "jsonwebtoken";
import User from "../User/user.model.js";

export const isUser = async (req, res, next) => {
  const authorization = req?.headers?.authorization;
  const splittedArray = authorization?.split(" ");
  const token = splittedArray[1];

  if (!token) {
    return res.status(400).send("unauthorizedd");
  }

  try {
    const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ email: userData.email });

    req.userInfo = user;
    next();
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};
