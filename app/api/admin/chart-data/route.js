import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog";

export async function GET(req) {
  await dbConnect();

  try {
    const publishedBlogsCount = await Blog.countDocuments({
      published: true,
    });

    const unpublishedBlogsCount = await Blog.countDocuments({
      published: false,
    });

    return NextResponse.json({ publishedBlogsCount, unpublishedBlogsCount });
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
