"use client";
import BlogCard from "@/components/blog/view/BlogCard";
import Pagination from "@/components/blog/view/Pagination";
// import { cookies } from "next/headers";
import { useBlog } from "@/context/blog";
import { useEffect } from "react";

export default async function AdminBlogs({ searchParams }) {
  // context
  const { blogs, page, totalPages, fetchBlogsForAdmin, blogPublishedStatus } =
    useBlog();

  useEffect(() => {
    fetchBlogsForAdmin(searchParams?.page);
  }, [searchParams?.page]);

  return (
    <div className="container">
      <div className="row mb-5">
        {blogs?.map((blog) => (
          <div className="col-lg-4" key={blog?._id}>
            <BlogCard blog={blog} page="/dashboard/author" />
            <span
              onClick={() => blogPublishedStatus(blog?._id)}
              className="btn rounded-pill shadow mx-auto d-block"
            >
              {blog?.published ? <span className="h4">✅</span> : "❌"}
            </span>
          </div>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
