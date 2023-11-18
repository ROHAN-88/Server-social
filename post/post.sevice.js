import { checkMongooseIdValidity } from "../utils/utils.js";
import Post from "./blog/post.model.js";
import { postValidation } from "./blog/post.validation.js";
//!==============create post================
export const creatPost = async (req, res) => {
  const feed = req.body;

  try {
    await postValidation.validateAsync(feed);

    feed.userId = req.userInfo._id;
    feed.firstName = req.userInfo.firstName;
    feed.lastName = req.userInfo.lastName;
    feed.pictureUrl = req.userInfo.pictureUrl;

    await Post.create(feed);

    return res.status(200).send("Added");
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

//!==========get all post from database==============
export const getAllPost = async (req, res) => {
  try {
    const blog = await Post.aggregate([
      {
        $match: {},
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return res.status(200).send(blog);
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};
//!==============get post by id===========

export const getPostId = async (req, res) => {
  const postId = req.params.id;

  try {
    //? -=-=====checking the validation of postId
    checkMongooseIdValidity(postId);

    //?=====find the post
    const postDetail = await Post.findOne({ _id: postId });

    return res.status(200).send(postDetail);
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

//!=================Edit Post=================
export const editPost = async (req, res) => {
  const editPostBody = req.body;
  const postId = req.params.id;
  const userId = req.userInfo._id;
  try {
    //!check whether id is valid or not
    checkMongooseIdValidity(postId);

    //!Searching if post exits or not
    const postDetail = await Post.findOne({ _id: postId });

    //!checking if it is owner
    const userPostId = postDetail.userId;
    const isPostOwner = userId.equals(userPostId);

    if (!isPostOwner) {
      return res.status(401).send("You'r not the owner");
    }

    //!validating request body
    await postValidation.validateAsync(editPostBody);

    /* //?updating post */
    const eiditedPost = await Post.updateOne(
      { _id: postId },
      {
        $set: {
          text: editPostBody.text,
          imageUrl: editPostBody.imageUrl,
        },
      }
    );

    return res.status(200).send("edited");
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

//!~===================delete post=================
export const deletePost = async (req, res) => {
  const deletePostId = req.params.id;
  const userId = req.userInfo._id;
  try {
    //!valid mongo id

    await checkMongooseIdValidity(deletePostId);

    //!finding post
    const post = await Post.findOne({ _id: deletePostId });

    if (!post) {
      return res.status(404).send("Post not found");
    }
    //!checking if it is owner
    const userPostId = post.userId;
    const isPostOwner = userId.equals(userPostId);

    if (!isPostOwner) {
      return res.status(401).send("You'r not the owner");
    }

    /*//? Deleting post */
    await Post.deleteOne({ _id: post._id });

    return res.status(200).send("Post Deleted");
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};
