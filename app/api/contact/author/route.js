import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { currentUser } from "@/utils/helpers";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_AUTH_USER,
    pass: process.env.GMAIL_AUTH_PASS,
  },
});

export async function POST(req) {
  const body = await req.json();
  //   console.log(body);
  const { message, emailTo } = body;

  const user = await currentUser();

  // Send email
  const mailOptions = {
    to: emailTo, // mail receiver email
    from: process.env.GMAIL_AUTH_USER, // mail sending service provider email
    subject: `Message from ${user?.name}`,
    html: `
        <p>${message}</p>
        <p>- ${user?.name} ${user?.email}</p>
        <br/>
        <pre>Message received from contact form @multiuserblog</pre>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: "Your message is sent to the author" });
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
