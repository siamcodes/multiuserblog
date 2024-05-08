"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.API}/password/forgot`, {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.err);
        setLoading(false);
      } else {
        toast.success(data.success);
        router.push("/password/reset");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-90">
      <div className="col-lg-4">
        <h1 className="mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!email?.trim() || loading}
          >
            {loading ? "Please wait.." : "Request Reset Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
