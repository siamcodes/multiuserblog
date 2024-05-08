import { NextResponse } from "next/server";
import Tag from "@/models/tag";
import dbConnect from "@/utils/dbConnect";
import slugify from "slugify";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/utils/authOptions";
import { currentUser } from "@/utils/helpers";

export async function POST(req) {
  await dbConnect();

  // const session = await getServerSession(authOptions);
  const user = await currentUser();

  const { name } = await req.json();

  try {
    const tag = await Tag.create({
      name,
      slug: slugify(name),
      postedBy: user._id,
    });
    return NextResponse.json(tag);
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}
