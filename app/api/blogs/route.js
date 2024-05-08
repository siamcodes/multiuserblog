import { NextResponse } from "next/server";
import Blog from "@/models/blog";
import dbConnect from "@/utils/dbConnect";

export async function GET(req) {
  await dbConnect();

  const page = req.nextUrl.searchParams.get("page") || 1;
  const pageSize = 6;

  try {
    const skip = (page - 1) * pageSize;
    const totalBlogs = await Blog.countDocuments({ published: true });
    console.log("PUBLISHED BLOGS ===> ", totalBlogs); // 4
    const blogs = await Blog.find({ published: true })
      .select("-content")
      .populate("postedBy", "name username")
      .populate("tags", "name slug")
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: "-1" });
    // .maxTimeMS(30000);

    return NextResponse.json(
      {
        blogs,
        page,
        totalPages: Math.ceil(totalBlogs / pageSize),
      },
      { status: 200 }
    );
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

// export async function GET(req) {
//   await dbConnect();

//   try {
//     const blogs = await Blog.find({}).sort({ createdAt: -1 });
//     return NextResponse.json(blogs);
//   } catch (err) {
//     return NextResponse.json(
//       {
//         err: err.message,
//       },
//       { status: 500 }
//     );
//   }
// }
