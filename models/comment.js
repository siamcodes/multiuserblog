import mongoose from "mongoose";
import User from "@/models/user";
import Blog from "@/models/blog";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      maxlength: 200,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
