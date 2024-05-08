import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_AUTH_USER,
    pass: process.env.GMAIL_AUTH_PASS,
  },
});

export async function POST(req) {
  const body = await req.json();
  const { name, email, message } = body;

  // Send email
  const mailOptions = {
    to: process.env.GMAIL_AUTH_USER, // mail receiver email
    from: process.env.GMAIL_AUTH_USER, // mail sending service provider email
    subject: "General Enquiry",
    html: `
        <p>${message}</p>
        <p>- ${name} ${email}</p>
        <br/>
        <pre>Message received from contact form @multiuserblog</pre>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: "Thank you for contacting us." });
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
