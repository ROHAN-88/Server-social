import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  userLoginValdation,
  userValidationRegister,
} from "./user.validation.js";
import User from "./user.model.js";
import { checkMongooseIdValidity } from "../utils/utils.js";

export const register = async (req, res) => {
  try {
    const newUser = req.body;

    //!find email if exist or not
    const user = await User.findOne({ email: newUser.email });
    if (user) {
      return res.status(400).send("User already exist ");
    }

    //!validation
    await userValidationRegister.validateAsync(newUser);

    //!hashing password
    const passwordHash = await bcrypt.hash(newUser.password, 8);

    newUser.password = passwordHash;

    await User.create(newUser);

    return res.status(200).send("User Register");
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

//!=================login ====================

export const login = async (req, res) => {
  try {
    const login = req.body;

    await userLoginValdation.validateAsync(login);

    //!finding if user exist or not
    const user = await User.findOne({ email: login.email });
    if (!user) {
      return res.status(400).send("Invalid credential-de");
    }

    //!comapreing password
    const comaprePass = await bcrypt.compare(login.password, user.password);
    if (!comaprePass) {
      return res.status(400).send("Invalid credential");
    }

    user.password = undefined;

    //!@access token
    const accesstoken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).send({ user, accesstoken });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

//!=================profile data ===========
export const userData = async (req, res) => {
  const userData = req.userInfo;

  return res.status(200).send(userData);
};

//!==============Edit user Detail

export const EditUser = async (req, res) => {
  const inputId = req.params.id;
  const userId = req.userInfo._id;
  const toBeEdited = req.body;
  try {
    //?checking valid mongoID
    checkMongooseIdValidity(inputId);

    //?check if it is authorized person
    if (userId != inputId) {
      return res.status(401).send("Unauthorized");
    }

    //?validation of the body
    const isValid = await userValidationRegister.validateAsync(toBeEdited);
    if (!isValid) {
      return res.status(400).send("Invalid Data");
    }

    //?update the user profile
    const editedData = await User.updateOne(
      { _id: inputId },
      {
        $set: {
          firstName: toBeEdited?.firstName,
          lastName: toBeEdited?.lastName,
          email: toBeEdited?.email,
          pictureUrl: toBeEdited?.pictureUrl,
          bio: toBeEdited?.bio,
          fbLinks: toBeEdited?.fbLinks,
          instaLinks: toBeEdited?.instaLinks,
          linkedLinks: toBeEdited?.linkedLinks,
          youtubeLinks: toBeEdited?.youtubeLinks,
          githubLinks: toBeEdited?.githubLinks,
          location: toBeEdited?.location,
          occupation: toBeEdited?.occupation,
        },
      }
    );

    return res.status(200).send("Edited");
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};
