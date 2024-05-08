import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import dbConnect from "@/utils/dbConnect";

export async function PUT(req) {
  await dbConnect();
  const { blogId } = await req.json();

  try {
    // Find the blog by ID
    const blog = await Blog.findById(blogId)
      .populate("tags", "name")
      .populate("postedBy", "name");

    if (!blog) {
      return NextResponse.json({ err: "Blog not found" }, { status: 404 });
    }

    // Toggle the published status
    blog.published = !blog.published;

    // Save the updated blog
    await blog.save();

    return NextResponse.json(blog);
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
