import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import randomInteger from "random-int";
import User from "@/models/user";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_AUTH_USER,
    pass: process.env.GMAIL_AUTH_PASS,
  },
});

export async function POST(req) {
  const { email } = await req.json();

  // const resetCode = nanoid(6); // Generate a 6-character code
  const resetCode = randomInteger(100000, 999999);

  const user = await User.findOne({ email });
  // Save reset code in the user db
  user.resetCode = {
    data: resetCode,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes in milliseconds,
  };
  await user.save();

  // Send email
  const mailOptions = {
    to: email, // mail receiver email
    from: process.env.GMAIL_AUTH_USER, // mail sending service provider email
    subject: "Password Reset Code",
    html: `
        <p>Your password reset code is valid for 10 min:</p>
        <h2>${resetCode}</h2>
        <br/>
        <pre>Email received from @multiuserblog</pre>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      success: "Check your email for password reset code",
    });
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
