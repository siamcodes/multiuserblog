import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog";
import { currentUser } from "@/utils/helpers";

export async function GET(req) {
  await dbConnect();

  const page = req.nextUrl.searchParams.get("page") || 1;
  const pageSize = 6;

  const user = await currentUser(req);

  try {
    const skip = (page - 1) * pageSize;
    const totalBlogs = await Blog.countDocuments({});

    const blogs = await Blog.find({ likes: user._id })
      .select("-content")
      .populate("postedBy", "name")
      .populate("tags", "name slug")
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: "-1" });

    return NextResponse.json({
      blogs,
      page,
      totalPages: Math.ceil(totalBlogs / pageSize),
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
