import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Comment from "@/models/comment";

export async function GET(req, context) {
  await dbConnect();

  const page = req.nextUrl.searchParams.get("page") || 1;
  const pageSize = 6;
  const blogId = context.params.blogid; // Get the blogId from context.params

  try {
    const skip = (page - 1) * pageSize;

    // Count comments with the specified blogId
    const totalComments = await Comment.countDocuments({ blogId });

    const comments = await Comment.find({ blogId })
      .sort({ createdAt: -1 })
      .populate("postedBy", "name username")
      .populate("blogId", "title slug")
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: "-1" });

    return NextResponse.json({
      comments,
      page,
      totalPages: Math.ceil(totalComments / pageSize),
    });
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}
