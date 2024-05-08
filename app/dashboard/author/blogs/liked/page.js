import BlogCard from "@/components/blog/view/BlogCard";
import Pagination from "@/components/blog/view/Pagination";

async function getLikedBlogs(page = 1) {
  const response = await fetch(`${process.env.API}/blogs?page=${page}`, {
    method: "GET",
    next: { revalidate: 1 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blogs.");
  }

  return await response.json();
}

export default async function Home({ searchParams }) {
  console.log("searchParams", searchParams);

  const { blogs, page, totalPages } = await getLikedBlogs(searchParams?.page);

  return (
    <>
      <div className="container">
        <div className="row mb-5">
          {blogs?.map((blog) => (
            <div className="col-lg-4" key={blog?._id}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} />
      </div>
    </>
  );
}
