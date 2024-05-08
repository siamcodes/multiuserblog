import { NextResponse } from "next/server";
import Tag from "@/models/tag";
import dbConnect from "@/utils/dbConnect";

export async function GET(req) {
  console.log("tags route =================================================");
  await dbConnect();

  try {
    const tags = await Tag.find({}).sort({ createdAt: -1 });
    console.log(tags);
    return NextResponse.json(tags);
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}
