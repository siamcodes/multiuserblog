"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.API}/password/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          resetCode,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.err);
        setLoading(false);
        return;
      } else {
        toast.success(data.message);
        setLoading(false); // Clear loading state after successful reset
        router.push("/login");
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
              type="text"
              className="form-control"
              placeholder="Reset code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!password?.trim() || !resetCode?.trim() || loading}
          >
            {loading ? "Please wait.." : "Request Reest Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
