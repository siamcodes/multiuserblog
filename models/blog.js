import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Tag from "@/models/tag";
import User from "@/models/user";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 160,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 160,
      maxLength: 20000,
    },
    excerpt: {
      type: String,
      maxLength: 320,
    },
    tags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
      },
    ],
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    featuredImage: String,
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

blogSchema.plugin(uniqueValidator, { message: "is already taken." });

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
