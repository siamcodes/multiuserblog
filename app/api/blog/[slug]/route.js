import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import dbConnect from "@/utils/dbConnect";

export async function GET(req, context) {
  await dbConnect();
  console.log("context params slug => ", context.params.slug);
  try {
    const blog = await Blog.findOne({ slug: context.params.slug })
      .populate("tags", "name slug")
      .populate("postedBy", "name username")
      .populate("likes", "name username");

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
