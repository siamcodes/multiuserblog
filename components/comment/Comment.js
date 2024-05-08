"use client";
import { useEffect, useState } from "react";
import CommentForm from "@/components/comment/CommentForm";
import Comments from "@/components/comment/Comments";
import CommentsLoadMore from "@/components/comment/CommentsLoadMore";
import toast from "react-hot-toast";

export default function Comment({ blogId }) {
  // create comment
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  // comments
  const [comments, setComments] = useState([]);
  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // update
  const [updatingText, setUpdatingText] = useState([]);

  const commentCreate = async () => {
    // console.log("blogId => ", blogId);
    try {
      const response = await fetch(`${process.env.API}/user/comment`, {
        method: "POST",
        body: JSON.stringify({ text, blogId }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        setComments([data, ...comments]);
        setText("");
        toast.success("Comment created");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (blogId) fetchComments(blogId, page);
  }, [blogId]);

  const fetchComments = async (blogId, page) => {
    // console.log("blogId => ", blogId);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.API}/comments/${blogId}?page=${page}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setLoading(false);
      if (!response.ok) {
        toast.error(data?.err);
      } else {
        // setComments(data?.comments);
        // Append the new comments to the existing comments
        setComments((prevComments) => [...prevComments, ...data?.comments]);
        setPage(data?.page);
        setTotalPages(data?.totalPages);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const commentUpdate = async (commentId, text) => {
    try {
      const response = await fetch(
        `${process.env.API}/user/comment/${commentId}`,
        {
          method: "PUT",
          body: JSON.stringify({ text }), // Send only the updated text
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
      } else {
        // Find the index of the updated comment in the state array
        const updatedCommentIndex = comments.findIndex(
          (c) => c._id === commentId
        );

        // Create a copy of the comments state array to avoid mutating the state directly
        const updatedComments = [...comments];

        // Update the text of the specific comment in the copy
        updatedComments[updatedCommentIndex].text = data.text;

        // Set the updated comments as the new state
        setComments(updatedComments);

        setUpdatingText("");
        toast.success("Comment updated");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const commentDelete = async (commentId) => {
    try {
      const response = await fetch(
        `${process.env.API}/user/comment/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Comment was successfully deleted
        // Remove the deleted comment from the state
        const updatedComments = comments.filter(
          (comment) => comment._id !== commentId
        );
        setComments(updatedComments);
        toast.success("Comment deleted successfully");
      } else {
        toast.error("Error deleting comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="col-lg-8 offset-lg-2 mt-5">
        <CommentForm
          blogId={blogId}
          commentCreate={commentCreate}
          text={text}
          setText={setText}
        />

        <Comments
          comments={comments}
          text={text}
          setText={setText}
          updatingText={updatingText}
          setUpdatingText={setUpdatingText}
          commentCreate={commentCreate}
          commentUpdate={commentUpdate}
          commentDelete={commentDelete}
        />

        <br />

        <CommentsLoadMore
          page={page}
          totalPages={totalPages}
          fetchComments={fetchComments}
          blogId={blogId}
        />
      </div>
    </>
  );
}
