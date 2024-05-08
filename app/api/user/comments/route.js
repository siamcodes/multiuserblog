import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Comment from "@/models/comment";
import { currentUser } from "@/utils/helpers";

export async function GET(req, context) {
  await dbConnect();
  const user = await currentUser();

  const page = req.nextUrl.searchParams.get("page") || 1;
  const pageSize = 6;

  try {
    const skip = (page - 1) * pageSize;

    // Count comments with the specified blogId
    const totalComments = await Comment.countDocuments({ postedBy: user._id });

    const comments = await Comment.find({ postedBy: user._id })
      .sort({ createdAt: -1 })
      .populate("postedBy", "name")
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
