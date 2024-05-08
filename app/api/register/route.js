import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

export async function POST(req) {
  await dbConnect();

  const { name, email, password } = await req.json();

  try {
    const username = nanoid(6); // Generate a unique username

    await new User({
      name,
      email,
      username, // Set the generated username here
      password: await bcrypt.hash(password, 10),
    }).save();

    return NextResponse.json({ success: "User created successfully" });
  } catch (err) {
    // 422 - unprocessable entity
    return NextResponse.json({ err: err.message }, { status: 422 });
  }
}
