import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import dbConnect from "@/utils/dbConnect";
import { currentUser } from "@/utils/helpers";
import slugify from "slugify";

export async function PUT(req, context) {
  await dbConnect();
  const { id } = context.params;
  const body = await req.json();

  const user = await currentUser();

  const blog = await Blog.findById(id);
  if (blog.postedBy.toString() !== user._id.toString()) {
    return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
  }

  try {
    const updated = await Blog.updateOne(
      { _id: id },
      { ...body, slug: slugify(body.title) },
      { new: true }
    );
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  await dbConnect();
  const { id } = context.params;

  const user = await currentUser();

  const blog = await Blog.findById(id);
  if (blog.postedBy.toString() !== user._id.toString()) {
    return NextResponse.json({ err: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleted = await Blog.deleteOne({ _id: id });
    return NextResponse.json(deleted, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
