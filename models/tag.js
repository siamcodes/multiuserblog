import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import User from "@/models/user";

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 32,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

tagSchema.plugin(uniqueValidator, { message: "is already taken." });

export default mongoose.models.Tag || mongoose.model("Tag", tagSchema);
