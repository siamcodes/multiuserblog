"use client";
import { useBlog } from "@/context/blog";

export default function BlogTitle({ onNextStep }) {
  const { title, setTitle } = useBlog();

  return (
    <>
      <div className="col-lg-6 offset-lg-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control p-5 mb-5"
          placeholder="Blog Title"
        />
      </div>
      <div className="d-flex justify-content-center my-4">
        <button
          className="btn btn-outline-primary p-5 col-6 mb-5"
          onClick={onNextStep}
          disabled={!title?.trim()}
        >
          Next
        </button>
      </div>
    </>
  );
}
