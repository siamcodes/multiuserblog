import BlogCard from "@/components/blog/view/BlogCard";
import TagsList from "@/components/tags/TagsList";

async function getBlogs(searchQuery) {
  const response = await fetch(
    `${process.env.API}/blogs/search?searchQuery=${searchQuery}`,
    {
      method: "GET",
      next: { revalidate: 1 },
    }
  );

  return await response.json();
}

export default async function Home({ searchParams }) {
  // console.log("searchParams", searchParams);

  const blogs = await getBlogs(searchParams?.searchQuery);

  return (
    <>
      <div className="container">
        <div className="row mb-5">
          {blogs?.length > 0 ? (
            blogs?.map((blog) => (
              <div className="col-lg-6" key={blog?._id}>
                <BlogCard blog={blog} />
              </div>
            ))
          ) : (
            <TagsList />
          )}
        </div>
      </div>
    </>
  );
}
