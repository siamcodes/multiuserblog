import { NextResponse } from "next/server";
import Comment from "@/models/comment";
import dbConnect from "@/utils/dbConnect";
import { currentUser } from "@/utils/helpers";

export async function POST(req) {
  await dbConnect();

  const user = await currentUser();
  const { text, blogId } = await req.json();

  try {
    const comment = await Comment.create({
      text,
      blogId,
      postedBy: user._id,
    });

    // populate postedBy filed
    await comment.populate("postedBy", "name");

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
