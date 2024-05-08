"use client";
import { useBlog } from "@/context/blog";
import { useEffect } from "react";

export default function Tags() {
  // context
  const {
    tagName,
    setTagName,
    tags,
    tagCreate,
    tagUpdate,
    tagList,
    tagDelete,
    updatingTag,
    setUpdatingTag,
  } = useBlog();

  useEffect(() => {
    tagList();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="row mt-3 mb-5">
          <div className="col-lg-12">
            <form onSubmit={updatingTag ? tagUpdate : tagCreate}>
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
        <p className="text-secondary m-1">Click to update tags</p>
        <div className="row d-flex justify-content-center align-items-center">
          <div
            className="col custom-scrollbar"
            style={{ maxHeight: "280px", overflow: "auto" }}
          >
            <div className="d-flex flex-wrap">
              {tags?.map((tag) => (
                <span key={tag._id}>
                  <button
                    className="btn btn-lg btn-outline-secondary m-1"
                    style={{
                      borderTopRightRadius: "0px",
                      borderBottomRightRadius: "0px",
                    }}
                    onClick={() => {
                      setTagName(tag.name);
                      setUpdatingTag(tag);
                    }}
                  >
                    {tag?.name}
                  </button>
                  <button
                    onClick={() => tagDelete(tag?._id)}
                    className="btn btn-lg btn-outline-danger me-2"
                    style={{
                      marginLeft: "-5px",
                      borderTopLeftRadius: "0px",
                      borderBottomLeftRadius: "0px",
                    }}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
