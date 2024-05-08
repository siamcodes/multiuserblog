import { NextResponse } from "next/server";
import Tag from "@/models/tag";
import dbConnect from "@/utils/dbConnect";
import slugify from "slugify";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/utils/authOptions";
import { currentUser } from "@/utils/helpers";
import Blog from "@/models/blog";

export async function PUT(req, context) {
  await dbConnect();

  const body = await req.json();

  try {
    const tag = await Tag.findById(context.params.id);

    if (!tag) {
      return NextResponse.json(
        {
          err: "Tag not found.",
        },
        { status: 404 }
      );
    }

    // Check if the user has permission to update the tag
    const user = await currentUser();

    if (
      tag.postedBy.toString() === user._id.toString() ||
      user.role.includes("admin")
    ) {
      const updatedTag = await Tag.findByIdAndUpdate(
        { _id: context.params.id },
        { ...body, slug: slugify(body.name) },
        { new: true }
      );

      return NextResponse.json(updatedTag);
    } else {
      return NextResponse.json(
        {
          err: "Unauthorized to update this tag.",
        },
        { status: 403 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  await dbConnect();

  // const session = await getServerSession(authOptions);
  const user = await currentUser();

  try {
    const tag = await Tag.findById(context.params.id);

    // Check if the user has permission to delete the tag
    if (
      tag.postedBy.toString() === user._id.toString() ||
      user.role === "admin"
    ) {
      // Check if the tag is used by any blogs
      const blogsWithThisTag = await Blog.find({ tags: context.params.id });

      if (blogsWithThisTag.length === 0) {
        const deletedTag = await Tag.findByIdAndDelete(context.params.id);
        return NextResponse.json(deletedTag);
      } else {
        return NextResponse.json(
          {
            err: "This tag is used by one or more blogs. It cannot be deleted.",
          },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json(
        {
          err: "Unauthorized to delete this tag.",
        },
        { status: 403 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}

// export async function DELETE(req, context) {
//   await dbConnect();

//   const session = await getServerSession(authOptions);

//   try {
//     const tag = await Tag.findById(context.params.id);
//     // console.log("TAG => ", tag.postedBy, "SESSION => ", session.user._id);

//     // Check if the user has permission to delete the tag
//     if (
//       tag.postedBy.toString() === session.user._id.toString() ||
//       session.user.role === "admin"
//     ) {
//       const deletedTag = await Tag.findByIdAndDelete(context.params.id);
//       return NextResponse.json(deletedTag);
//     } else {
//       return NextResponse.json(
//         {
//           error: "Unauthorized to delete this tag.",
//         },
//         { status: 403 }
//       );
//     }
//   } catch (err) {
//     return NextResponse.json(
//       {
//         error: err.message,
//       },
//       { status: 500 }
//     );
//   }
// }
