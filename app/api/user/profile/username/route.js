import { NextResponse } from "next/server";
import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import { currentUser } from "@/utils/helpers";

export async function PUT(req) {
  await dbConnect();

  // Get the current user
  const user = await currentUser();

  try {
    // Extract the new username from the request body
    const { username } = await req.json();

    // Check if the new username is unique
    const existingUserWithUsername = await User.findOne({
      username,
    });

    if (existingUserWithUsername) {
      return NextResponse.json(
        {
          err: "Username already exists. Please choose a different username.",
        },
        { status: 400 }
      );
    }

    // Update the user's username
    user.username = username;

    // Save the updated user to the database
    await user.save();

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}
