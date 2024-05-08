import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog";
import Tag from "@/models/tag";

export async function GET(req) {
  await dbConnect();

  const blogSearchQuery = req.nextUrl.searchParams.get("searchQuery");
  if (!blogSearchQuery) {
    return NextResponse.json([]);
  }

  try {
    // Split the search query into keywords for queries with spaces
    const keywords = blogSearchQuery.split(/\s+/);

    // Search for categories based on each keyword
    const tagPromises = keywords.map(async (keyword) => {
      return Tag.find({
        name: { $regex: keyword, $options: "i" },
      });
    });

    // Wait for all tag search promises to resolve
    const tagResults = await Promise.all(tagPromises);

    // Extract tagIds from tagResults
    const tagIds = tagResults.flatMap((tags) => tags.map((t) => t._id));

    // Create an array of search criteria for titles and content
    const titleAndContentQueries = keywords.map((keyword) => ({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ],
    }));

    // Combine the tag search with the title and content search using $or
    const searchQueries = [
      ...titleAndContentQueries,
      { tags: { $in: tagIds } },
    ];

    // Main blogs search query
    const blogs = await Blog.find({
      $or: searchQueries,
    })
      .select("-content")
      .populate("postedBy", "name username")
      .populate("tags", "name slug")
      .limit(12)
      .sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
