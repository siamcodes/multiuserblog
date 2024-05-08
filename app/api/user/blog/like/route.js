import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog";
import { currentUser } from "@/utils/helpers";

export async function POST(req) {
  await dbConnect();

  const { blogId } = await req.json();
  const user = await currentUser(req);

  try {
    const likedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $addToSet: { likes: user._id } },
      { new: true }
    );

    return NextResponse.json(likedBlog);
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

export async function PUT(req) {
  await dbConnect();

  const { blogId } = await req.json();
  const user = await currentUser(req);

  try {
    const unlikedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { likes: user._id } },
      { new: true }
    );

    return NextResponse.json(unlikedBlog);
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
