"use client";
import { useBlog } from "@/context/blog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function Tags({ onNextStep, onPrevStep }) {
  // context
  const {
    tagName,
    setTagName,
    tags,
    setTags,
    tagCreate,
    tagList,
    selectedTags,
    setSelectedTags,
    tagDelete,
  } = useBlog();
  // state
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useSession();

  useEffect(() => {
    tagList();
  }, []);

  // moved to blog/create/page
  // useEffect(() => {
  //   const storedTags = JSON.parse(localStorage.getItem("selectedTags")) || [];
  //   setSelectedTags(storedTags);
  // }, []);

  const handleTagSelect = (tag) => {
    // Check if the tag is already selected
    if (selectedTags.some((selectedTag) => selectedTag._id === tag._id)) {
      toast.error("Tag is already selected.");
      return;
    }

    // Check if the maximum limit of 5 tags is reached
    if (selectedTags.length >= 5) {
      toast.error("You can select up to 5 tags.");
      return;
    }

    // Add the tag to selectedTags
    setSelectedTags([tag, ...selectedTags]);
    // save in local storage
    localStorage.setItem(
      "selectedTags",
      JSON.stringify([tag, ...selectedTags])
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const matchingTag = tags.find((t) =>
        t?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
      );

      if (matchingTag) {
        handleTagSelect(matchingTag);
        setSearchTerm(""); // Clear the input field after adding the tag
      }
    }
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = selectedTags.filter(
      (tag) => tag._id !== tagToRemove._id
    );
    setSelectedTags(updatedTags);
    localStorage.setItem("selectedTags", JSON.stringify(updatedTags));
  };

  return (
    <>
      {/* tag filter and create */}
      <div className="row mt-3 mb-5">
        <div className="col-lg-6">
          <input
            type="search"
            className="form-control p-5"
            placeholder="Filter tags"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus={true}
          />
        </div>
        <div className="col-lg-6">
          <form onSubmit={tagCreate}>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Create tag"
              className="form-control p-5"
            />
          </form>
        </div>
      </div>

      {/* all tags list */}
      <p className="text-secondary m-1">Click to select tags</p>
      <div className="row d-flex justify-content-center align-items-center">
        <div
          className="col custom-scrollbar"
          style={{ maxHeight: "280px", overflow: "auto" }}
        >
          {tags
            ?.filter((t) =>
              t?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            )
            ?.map((tag) => (
              <span key={tag._id}>
                <button
                  className="btn btn-lg btn-outline-secondary m-1"
                  onClick={() => handleTagSelect(tag)}
                >
                  {tag?.name}
                </button>
                {tag?.postedBy === data?.user?._id &&
                  !selectedTags.includes(tag?._id) && (
                    <button
                      onClick={() => tagDelete(tag?._id)}
                      className="btn btn-lg btn-outline-danger me-4"
                    >
                      X
                    </button>
                  )}
              </span>
            ))}
        </div>
      </div>

      {/* selected tags list */}
      {selectedTags?.length > 0 && (
        <p className="text-secondary m-1">Selected tags</p>
      )}
      <div
        className="d-flex align-items-center custom-scrollbar"
        style={{ maxHeight: "280px", overflow: "auto" }}
      >
        {selectedTags?.map((tag) => (
          <div key={tag._id}>
            <button
              className="btn btn-lg btn-outline-success m-1"
              onClick={() => handleTagRemove(tag)}
            >
              {tag?.name}
            </button>
          </div>
        ))}
      </div>

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
          disabled={selectedTags?.length < 1}
        >
          Next
        </button>
      </div>
    </>
  );
}

// TAG UPDATE FOR ADMIN

/**
"use client";
import { useBlog } from "@/context/blog";
import { useEffect } from "react";

export default function TagForm() {
  const {
    tagName,
    setTagName,
    tags,
    setTags,
    tagCreate,
    tagList,
    updatingTag,
    setUpdatingTag,
    tagUpdate,
  } = useBlog();

  useEffect(() => {
    tagList();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("search");
  };

  return (
    <>
      <div className="row mt-3 mb-5">
        <div className="col-lg-6">
          <form onSubmit={handleSearch}>
            <input
              type="search"
              className="form-control p-5"
              placeholder="Filter tags"
            />
          </form>
        </div>
        <div className="col-lg-6">
          <form onSubmit={updatingTag ? tagUpdate : tagCreate}>
            <input
              type="text"
              value={updatingTag ? updatingTag?.name : tagName}
              onChange={(e) =>
                updatingTag
                  ? setUpdatingTag({ ...updatingTag, name: e.target.value })
                  : setTagName(e.target.value)
              }
              placeholder="Create tag"
              className="form-control p-5"
            />
          </form>
        </div>
      </div>

      <div className="row d-flex justify-content-center align-items-center">
        <div
          className="col custom-scrollbar"
          style={{ maxHeight: "280px", overflow: "auto" }}
        >
          {tags?.map((tag) => (
            <button
              key={tag._id}
              className="btn btn-lg btn-outline-secondary m-1"
              onClick={() => setUpdatingTag(tag)}
            >
              {tag?.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
 */
