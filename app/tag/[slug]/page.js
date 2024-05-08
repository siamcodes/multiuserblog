import BlogCard from "@/components/blog/view/BlogCard";
import Pagination from "@/components/blog/view/Pagination";
import TagsList from "@/components/tags/TagsList";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { tag } = await getTagWithBlogs(params?.slug);
  return {
    title: tag?.name,
    description: `Read latest blogs tagged ${tag?.name} on React, Node.js, Next.js, and other web development topics.`,
  };
}

async function getTagWithBlogs(slug, page = 1) {
  const response = await fetch(`${process.env.API}/tag/${slug}?page=${page}`, {
    method: "GET",
    next: { revalidate: 1 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blogs.");
  }

  return await response.json();
}

export default async function TagWithBlogs({ params, searchParams }) {
  const { blogs, page, totalPages, tag } = await getTagWithBlogs(
    params?.slug,
    searchParams?.page
  );

  console.log({ blogs, page, totalPages, tag });

  return (
    <div className="container">
      <div className="row">
        <h2 className="text-left lead mt-3">Blogs tagged "{tag?.name}"</h2>
      </div>
      <div className="row mb-5">
        <div className="col-lg-8" style={{ minHeight: "100vh" }}>
          {blogs?.length > 0 ? (
            blogs?.map((blog) => (
              <div key={blog?._id} >
                <BlogCard blog={blog} />
              </div>
            ))
          ) : (
            <div className="d-flex align-items-center vh-80 position-fixed">
              No blogs found tagged&nbsp;<strong>{tag?.name}</strong>. Be the
              first one to&nbsp;<Link href="/blog/create">write</Link>!
            </div>
          )}
        </div>

        {/* This is the fixed sidebar for larger screens */}
        <div
          className="col-lg-4 position-fixed d-none d-lg-block"
          style={{ height: "100vh", overflowY: "auto", right: 0 }}
        >
          <TagsList />
        </div>

        {/* This is the stacked sidebar for smaller screens */}
        <div className="col-12 d-block d-lg-none">
          <TagsList />
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
