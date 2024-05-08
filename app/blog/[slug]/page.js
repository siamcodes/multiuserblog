import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BlogLike from "@/components/blog/BlogLike";
import Image from "next/image";
import md from "@/utils/md";
import Link from "next/link";
import Comment from "@/components/comment/Comment";

dayjs.extend(relativeTime);

export async function generateMetadata({ params }) {
  const blog = await getBlog(params?.slug);
  return {
    title: blog?.title,
    description: blog?.content?.substr(0, 160),
  };
}

async function getBlog(slug) {
  const apiUrl = `${process.env.API}/blog/${slug}`;

  const options = {
    method: "GET",
    next: { revalidate: 1 },
  };

  try {
    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function BlogViewPage({ params }) {
  // console.log("params in single blog view => ", params);
  const blog = await getBlog(params?.slug);

  return (
    <>
      <Image
        src={
          blog?.featuredImage.replace("dbyydzmbi", "merncms") ||
          "/images/default.jpeg"
        }
        className="card-img-top"
        width={500}
        height={300}
        style={{ objectFit: "cover", height: "55vh", marginTop: "-15vh" }}
        alt={blog?.title}
      />

      <div className="container my-5">
        <div className="row">
          <h1 className="fw-bold">{blog?.title}</h1>
          <p className="lead fw-bold">
            Published on {dayjs(new Date()).format("YYYY-MM-DD HH:mm A")} by{" "}
            <Link
              href={`/${
                blog?.postedBy?.username
                  ? blog?.postedBy?.username
                  : blog?.postedBy?._id
              }`}
            >
              {blog?.postedBy?.name || "Admin"}
            </Link>
          </p>

          <div className="mb-4">
            <BlogLike blog={blog} />
          </div>

          <div className="d-flex mb-5">
            {blog?.tags?.map((t) => (
              <Link
                href={`/tag/${t?.slug}`}
                className="btn btn-outline-primary me-2"
                key={t?._id}
              >
                {t?.name}
              </Link>
            ))}
          </div>

          <div className="container">
            <div className="row">
              <div className="col-lg-10">
                <div className="markdown-preview lead">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: md.render(blog?.content),
                    }}
                  />
                </div>
              </div>

              <div className="col-lg-2 overflow-auto vh-50">
                <p className="lead">Liked by {blog?.likes?.length} people</p>
                {blog?.likes?.map((like) => (
                  <div key={like?._id}>
                    <Link
                      href={`/${like?.username ? like?.username : like?._id}`}
                    >
                      {like?.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Comment blogId={blog?._id} />
        </div>
      </div>
    </>
  );
}
