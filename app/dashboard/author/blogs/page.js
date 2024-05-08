"use client";
import BlogCard from "@/components/blog/view/BlogCard";
import Pagination from "@/components/blog/view/Pagination";
// import { cookies } from "next/headers";
import { useBlog } from "@/context/blog";
import { useEffect } from "react";

// async function getBlogs(page = 1) {
//   const nextCookies = cookies();
//   const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

//   const response = await fetch(`${process.env.API}/author/blogs?page=${page}`, {
//     method: "GET",
//     next: { revalidate: 1 },
//     headers: {
//       Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch blogs.");
//   }

//   return await response.json();
// }

export default async function AuthorBlogs({ searchParams }) {
  //   const { blogs, page, totalPages } = await getBlogs(searchParams?.page);

  const { blogs, page, totalPages, fetchAuthorBlogs, blogDelete } = useBlog();

  useEffect(() => {
    fetchAuthorBlogs(searchParams?.page);
  }, [searchParams?.page]);

  return (
    <div className="container">
      <div className="row mb-5">
        {blogs?.map((blog) => (
          <div className="col-lg-6" key={blog?._id}>
            <BlogCard blog={blog} page="/dashboard/author" />
            <button
              onClick={() => blogDelete(blog?._id)}
              className="btn btn-danger rounded-pill shadow mx-auto m-2 d-block"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
