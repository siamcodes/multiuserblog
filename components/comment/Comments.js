import { useSession } from "next-auth/react";
import dayjs from "@/utils/dayjs";
import Link from "next/link";

export default function Comments({
  comments,
  updatingText,
  setUpdatingText,
  commentUpdate,
  commentDelete,
}) {
  const { data } = useSession();

  const isOwner = (comment) => data?.user?._id === comment?.postedBy?._id;

  setTimeout(() => {
    const commentElement = document.getElementById(
      window?.location?.hash?.slice(1)
    );
    if (commentElement) {
      commentElement.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);

  return (
    <div className="row">
      {/* comments map */}
      {comments?.map((c, index) => (
        <div key={c?._id} id={c?._id}>
          <div className="d-flex justify-content-between mb-2">
            <div className="col mb-4">
              <textarea
                type="text"
                value={updatingText[index] ? updatingText[index] : c?.text}
                onChange={(e) =>
                  setUpdatingText((prevText) => {
                    const newText = [...prevText];
                    newText[index] = e.target.value;
                    return newText;
                  })
                }
                // use border-0 to remove the border
                // use shadow-none to remove the box-shadow
                className="form-control border-5"
                placeholder="Leave a comment..."
                maxLength="160"
                disabled={!isOwner(c)}
              />
              <small
                className="text-muted fst-italic ms-3"
                style={{ fontSize: "8px" }}
              >
                Posted {dayjs(c?.createdAt).fromNow()} by{" "}
                <Link
                  href={`/${
                    c?.postedBy?.username
                      ? c?.postedBy?.username
                      : c?.postedBy?._id
                  }`}
                >
                  {c?.postedBy?.name}
                </Link>
              </small>
            </div>

            {isOwner(c) && (
              <div className="ms-2">
                <button
                  className="btn btn-sm btn-outline-warning col-12 mb-2"
                  onClick={() => commentUpdate(c?._id, updatingText[index])}
                  disabled={!updatingText[index]?.trim()}
                >
                  Edit
                </button>
                <button
                  onClick={() => commentDelete(c?._id)}
                  className="btn btn-sm btn-outline-danger col-12"
                >
                  Del
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
