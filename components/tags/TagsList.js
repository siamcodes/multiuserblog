"use client";
import { useBlog } from "@/context/blog";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function Tags() {
  // context
  const { tags, tagList } = useBlog();

  useEffect(() => {
    tagList();
  }, []);

  return (
    <div className="d-flex align-items-center vh-2">
      <div className="row text-center col-lg-6 offset-lg-3 my-5">
        <div
          className="col custom-scrollbar"
          style={{ maxHeight: "280px", overflow: "auto" }}
        >
          {tags?.length > 0 ? (
            tags?.map((tag) => (
              <Link key={tag?._id} href={`/tag/${tag?.slug}`}>
                <button
                  className="btn btn-lg btn-outline-secondary m-1"
                  onClick={() => handleTagSelect(tag)}
                >
                  {tag?.name}
                </button>
              </Link>
            ))
          ) : (
            <div className="text-center">
              <h2>Loading..</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
