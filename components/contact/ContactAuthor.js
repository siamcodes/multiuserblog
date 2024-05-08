"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function ContactAuthor({ emailTo }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status !== "authenticated") {
      toast.error("Please login to send message.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${process.env.API}/contact/author`, {
        method: "POST",
        body: JSON.stringify({
          message,
          emailTo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
        setLoading(false);
      } else {
        toast.success(data.success);
        setMessage("");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <main>
      <div className="container">
        <div className="p-4 shadow rounded">
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-control p-3 mb-4"
              placeholder="Your message"
              maxLength={200}
            />

            <small
              className="form-text d-flex justify-content-end mb-2"
              style={{ marginTop: "-20px" }}
            >
              <i>{message?.trim()?.length} of 200</i>
            </small>
            <button
              className="btn btn-secondary mb-2"
              disabled={!message?.trim() || loading}
            >
              {message?.trim() && "🚀"}{" "}
              {loading ? "Please wait.." : "Message Author"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
