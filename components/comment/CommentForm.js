export default function CommentForm({ blogId, commentCreate, text, setText }) {
  return (
    <>
      <textarea
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="form-control p-5 mt-2"
        placeholder="Leave a comment..."
        maxLength="500"
      />

      <small
        className="d-flex justify-content-end mb-4"
        style={{ fontSize: "10px" }}
      >
        {text?.length}/500
      </small>

      <button
        className="btn btn-outline-primary p-5 col-12 mb-5"
        onClick={() => commentCreate(blogId)}
        disabled={!text?.trim()}
      >
        Post
      </button>
    </>
  );
}
