"use client";
import Pagination from "@/components/blog/view/Pagination";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import dayjs from "@/utils/dayjs";
import Link from "next/link";

export default async function UserCommentsPage() {
  const [comments, setComments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    fetchUserComments(page);
  }, [page]);

  const fetchUserComments = async (page = 1) => {
    try {
      const response = await fetch(
        `${process.env.API}/user/comments?page=${page}`,
        {
          method: "GET",
          next: { revalidate: 1 },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        setComments(data?.comments);
        setTotalPages(data?.totalPages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row mb-5">
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <div
              className="col-lg-6 offset-lg-3 mt-2 mb-2 border rounded-4"
              key={comment?._id}
            >
              {/* <pre>{JSON.stringify(comment, null, 4)}</pre> */}

              <p className="text-muted mt-2">{comment?.text}</p>
              <Link
                href={`/blog/${comment?.blogId?.slug}#${comment?._id}`}
                className="  fst-italic"
              >
                View Blog
              </Link>
              <p className="text-muted">
                {dayjs(comment?.createdAt).fromNow()}
              </p>
            </div>
          ))
        ) : (
          <div className="col-lg-6 offset-lg-3 text-center mt-4">
            <p>You can view your comments here..</p>
          </div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} pathname={pathname} />
    </div>
  );
}
