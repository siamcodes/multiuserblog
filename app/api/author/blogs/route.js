import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import dbConnect from "@/utils/dbConnect";
import { currentUser } from "@/utils/helpers";

export async function GET(req) {
  await dbConnect();

  const page = req.nextUrl.searchParams.get("page") || 1;
  const pageSize = 6;

  const user = await currentUser();

  try {
    const skip = (page - 1) * pageSize;
    const totalBlogs = await Blog.countDocuments({ postedBy: user._id });

    const blogs = await Blog.find({ postedBy: user._id })
      .select("-content")
      .populate("postedBy", "name")
      .populate("tags", "name slug")
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: "-1" });

    return NextResponse.json(
      {
        blogs,
        page,
        totalPages: Math.ceil(totalBlogs / pageSize),
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}
