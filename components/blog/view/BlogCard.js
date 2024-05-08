import Link from "next/link";
import Image from "next/image";
import "highlight.js/styles/monokai.css";
import dayjs from "@/utils/dayjs";

export default function BlogCard({ blog, page = "" }) {
  return (
    <div className="card mt-4 shadow">
      {/* <pre>{JSON.stringify(blog, null, 4)}</pre> */}
      <div style={{ height: "200px", overflow: "hidden" }}>
        <Image
          src={
            blog?.featuredImage?.replace("dbyydzmbi", "merncms") ||
            "/images/default.jpeg"
          }
          className="card-img-top"
          width={500}
          height={300}
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
          alt={blog?.title}
        />
      </div>

      <div className="card-body d-flex justify-content-between align-items-center">
        <Link
          className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-secondary text-muted"
          href={`${page}/blog/${blog?.slug}`}
        >
          <h5 className="card-title fw-bold h2">{blog?.title}</h5>
        </Link>
      </div>

      <div className="card-body">
        <div className="card-text">
          <div className="markdown-preview text-secondary">
            <div
              dangerouslySetInnerHTML={
                blog?.excerpt ? { __html: blog.excerpt } : { __html: "" }
              }
            />
          </div>
        </div>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <div>
          ❤️ {blog?.likes?.length} {blog?.likes?.length > 1 ? "likes" : "like"}
        </div>
        <div>
          🕒 {dayjs(blog?.createdAt).fromNow()} 👱{" "}
          {blog?.postedBy ? (
            <Link
              href={`/${
                blog?.postedBy?.username
                  ? blog?.postedBy?.username
                  : blog?.postedBy?._id
              }`}
            >
              {blog?.postedBy?.name}
            </Link>
          ) : (
            "Admin"
          )}
        </div>
      </div>

      {
        <div className="card-footer d-flex justify-content-between align-items-center">
          <div className="d-flex my-2">
            {blog?.tags?.map((t) => (
              <Link
                className="btn btn-outline-secondary me-2 rounded-pill"
                key={t?._id}
                href={`/tag/${t?.slug}`}
              >
                {t?.name}
              </Link>
            ))}
          </div>
        </div>
      }
    </div>
  );
}
