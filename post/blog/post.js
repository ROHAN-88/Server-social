import express from "express";
import { isUser } from "../../Authication/authication.js";
import {
  creatPost,
  deletePost,
  editPost,
  getAllPost,
  getPostId,
} from "../post.sevice.js";
import { checkMongooseIdValidity } from "../../utils/utils.js";
import Post from "./post.model.js";

const routes = express.Router();

// ===request ===
//?========================Creat post=============
routes.post("/addPost", isUser, creatPost);

//? ==============get post==============
routes.get("/getPosts", isUser, getAllPost);

//? ==============get post by ID==============
routes.get("/getPost/:id", isUser, getPostId);

//?================Get post of User=============
routes.get("/getPostOfUser", isUser, async (req, res) => {
  const userId = req.userInfo._id;

  try {
    //!=======check if userId validity================
    checkMongooseIdValidity(userId);

    const userPost = await Post.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
    ]);

    return res.status(200).send(userPost);
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

//?==============edit================
routes.put("/editPost/:id", isUser, editPost);

//?=================delete========================
routes.delete("/deletePost/:id", isUser, deletePost);
export default routes;
