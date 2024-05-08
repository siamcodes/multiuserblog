import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import slugify from "slugify";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/utils/authOptions";
import { currentUser } from "@/utils/helpers";
import { createExcerpt } from "@/utils/helpers";

export async function POST(req) {
  await dbConnect();

  // const session = await getServerSession(authOptions);
  const user = await currentUser();

  const body = await req.json();
  //   console.log("blog create => ", body);

  try {
    const blog = await Blog.create({
      ...body,
      slug: slugify(body.title),
      excerpt: createExcerpt(body.content),
      // postedBy: session.user._id,
      postedBy: user._id,
    });

    // await User.findOneAndUpdate({ _id: session.user._id }, { role: "author" });
    await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { role: "author" } }
    );

    return NextResponse.json(blog);
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}
