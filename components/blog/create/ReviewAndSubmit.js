"use client";
import { useBlog } from "@/context/blog";
import BlogPreview from "@/components/blog/create/BlogPreview";

export default function ReviewAndSubmit({ onPrevStep, update = false }) {
  // context
  const {
    title,
    markdown,
    selectedTags,
    blogCreate,
    uploadingImage,
    blogUpdate,
  } = useBlog();

  return (
    <>
      <BlogPreview />

      <div className="container">
        <div className="d-flex justify-content-center my-4">
          <button
            className="btn btn-outline-primary p-5 col-6 my-5 me-1"
            onClick={onPrevStep}
          >
            Previous
          </button>

          <button
            className="btn btn-primary p-5 col-6 my-5 ms-1"
            onClick={update ? blogUpdate : blogCreate}
            disabled={
              !title?.trim() ||
              markdown?.trim().length < 60 ||
              selectedTags?.length < 1 ||
              uploadingImage
            }
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
