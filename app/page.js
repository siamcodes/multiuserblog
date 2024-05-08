import BlogCard from "@/components/blog/view/BlogCard";
import Pagination from "@/components/blog/view/Pagination";
import TagsList from "@/components/tags/TagsList";

export const metadata = {
  title: "Blogs",
  description:
    "Read latest blogs on react node nextjs and other web development topics",
};

async function getBlogs(page = 1) {
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
  // console.log("searchParams", searchParams);

  const { blogs, page, totalPages } = await getBlogs(searchParams?.page);

  return (
    <>
      <TagsList />
      <div className="container">
        <div className="row mb-3">
          {blogs?.map((blog) => (
            <div className="col-lg-8 offset-lg-2" key={blog?._id}>
              <BlogCard blog={blog} />
              {/* <pre>{JSON.stringify(blog, null, 4)}</pre> */}
            </div>
          ))}
        </div>

        <Pagination page={page} totalPages={totalPages} />
      </div>
    </>
  );
}
