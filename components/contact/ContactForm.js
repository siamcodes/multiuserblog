"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`${process.env.API}/contact`, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
        setLoading(false);
      } else {
        toast.success(data.success);
        router.push("/");
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
        <div className="row d-flex justify-content-center align-items-center vh-90">
          <div className="p-4 shadow">
            <h2 className="mb-4 lead fw-bold">Contact Us</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control p-3 mb-4"
                placeholder="Your name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control p-3 mb-4"
                placeholder="Your email"
              />
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
                className="btn btn-lg w-100 btn-primary w-100 mb-2"
                disabled={loading || !name || !email || !message}
              >
                {loading ? "Please wait.." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
