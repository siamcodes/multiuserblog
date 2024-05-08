import { NextResponse } from "next/server";
import Comment from "@/models/comment";
import dbConnect from "@/utils/dbConnect";
import { currentUser } from "@/utils/helpers";

export async function PUT(req, context) {
  await dbConnect();

  const { id } = context.params;
  const { text } = await req.json();

  const user = await currentUser();

  try {
    // Find the comment by ID and check ownership in the same query
    const comment = await Comment.findOneAndUpdate(
      { _id: id, postedBy: user._id },
      { text },
      { new: true }
    );

    if (!comment) {
      // If the comment doesn't exist or the user doesn't own it, return Unauthorized
      return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(comment);
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  await dbConnect();

  const { id } = context.params;

  const user = await currentUser();

  try {
    // Find the comment by ID and check ownership in the same query
    const comment = await Comment.findOneAndDelete({
      _id: id,
      postedBy: user._id,
    });

    if (!comment) {
      // If the comment doesn't exist or the user doesn't own it, return Unauthorized
      return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(comment);
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}
