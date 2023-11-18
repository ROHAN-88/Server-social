import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 50,
    },
    pictureUrl: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },
    fbLinks: {
      type: String,
      defaultL: "",
    },
    instaLinks: {
      type: String,
      defaultL: "",
    },
    linkedLinks: {
      type: String,
      defaultL: "",
    },
    youtubeLinks: {
      type: String,
      defaultL: "",
    },
    githubLinks: {
      type: String,
      defaultL: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
