import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import Blog from "@/models/blog";

export async function GET(req, context) {
  await dbConnect();

  const page = req.nextUrl.searchParams.get("page") || 1;
  const pageSize = 6;

  const { username } = context.params;

  try {
    let user;

    // Try to find the user by username
    user = await User.findOne({ username });

    // If the user is not found by username, try to find by _id
    if (!user) {
      user = await User.findById(username);
    }

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // Find all blogs by the user's _id
    const skip = (page - 1) * pageSize;
    const totalBlogs = await Blog.countDocuments({ postedBy: user._id });

    const blogs = await Blog.find({ postedBy: user._id })
      .select("-content")
      .populate("postedBy", "name")
      .populate("tags", "name slug")
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: "-1" });
    const { name, email, createdAt, ...rest } = { ...user._doc };

    return NextResponse.json({
      user: { name, email, username, createdAt },
      blogs,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / pageSize),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}
