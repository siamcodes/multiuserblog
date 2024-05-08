import { useBlog } from "@/context/blog";
import MarkdownIt from "markdown-it";
// import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";
import md from "@/utils/md";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
// dayjs.extend(relativeTime);
import dayjs from "@/utils/dayjs";

export default function BlogPreview({ onNextStep }) {
  const { title, markdown, selectedTags, featuredImage } = useBlog();
  const { data } = useSession();

  return (
    <>
      {featuredImage && (
        <img
          src={featuredImage}
          className="img img-fluid mb-5"
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "cover",
          }}
        />
      )}
      <div className="container">
        <div className="row">
          <h1 className="fw-bold">{title}</h1>
          <p>
            Published on {dayjs(new Date()).format("YYYY-MM-DD HH:mm A")} by{" "}
            {data?.user?.name}
          </p>

          <div className="d-flex mb-5">
            {selectedTags?.map((t) => (
              <button
                className="btn btn-outline-primary me-2"
                key={t?._id}
                disabled
              >
                {t?.name}
              </button>
            ))}
          </div>

          <div className="markdown-preview">
            <div dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />
          </div>
        </div>
      </div>
    </>
  );
}
