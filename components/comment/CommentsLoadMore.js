export default function CommentsLoadMore({
  page,
  totalPages,
  fetchComments,
  blogId,
}) {
  return (
    <>
      {page < totalPages && (
        <div className="text-center">
          <button
            className="btn btn-outline-primary p-3"
            onClick={() => fetchComments(blogId, parseInt(page) + 1)}
          >
            Load More Comments
          </button>
        </div>
      )}
    </>
  );
}
