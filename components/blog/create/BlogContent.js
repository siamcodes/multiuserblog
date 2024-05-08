"use client";
import React from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { imageUpload } from "@/utils/imageUpload";
import { useBlog } from "@/context/blog";
import md from "@/utils/md";

export default function BlogContent({ onNextStep, onPrevStep }) {
  const { markdown, setMarkdown } = useBlog();

  return (
    <div>
      <MdEditor
        value={markdown}
        style={{ height: "60vh" }}
        onChange={({ text }) => setMarkdown(text)}
        renderHTML={(text) => md.render(text)}
        onImageUpload={(file) => imageUpload(file)}
        placeholder="Write your blog here..."
      />

      <div className="d-flex justify-content-center my-4">
        <button
          className="btn btn-outline-primary p-5 col-6 my-5 me-1"
          onClick={onPrevStep}
        >
          Previous
        </button>

        <button
          className="btn btn-outline-primary p-5 col-6 my-5 ms-1"
          onClick={onNextStep}
          disabled={markdown?.trim().length < 60}
        >
          Next
        </button>
      </div>
    </div>
  );
}
