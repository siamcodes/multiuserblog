import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog";
import { currentUser } from "@/utils/helpers";

export async function GET(req) {
  await dbConnect();

  try {
    const user = await currentUser();

    const blogsCreatedCount = await Blog.countDocuments({ postedBy: user._id });

    const blogsLikedCount = await Blog.countDocuments({ likes: user._id });

    return NextResponse.json({ blogsCreatedCount, blogsLikedCount });
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
