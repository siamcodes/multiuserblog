import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import Blog from "@/models/blog";

export async function GET(req, context) {
  await dbConnect();
  const slug = context.params.slug;
  const page = req.nextUrl.searchParams.get("page") || 1;
  const pageSize = 6;

  try {
    const tag = await Tag.findOne({ slug });

    const skip = (page - 1) * pageSize;
    const totalBlogs = await Blog.countDocuments({ tags: tag._id });

    const blogs = await Blog.find({ tags: tag._id })
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
        tag,
      },
      { status: 200 }
    );
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
