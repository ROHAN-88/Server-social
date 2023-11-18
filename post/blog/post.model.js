import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      min: 5,
      max: 100,
    },

    imageUrl: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.ObjectId, //mongoose.Schema.Types.ObjectId
      ref: "User",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    pictureUrl: {
      type: String,
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
