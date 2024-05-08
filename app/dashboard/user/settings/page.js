"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserSettings() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { data, update } = useSession();

  const router = useRouter();

  useEffect(() => {
    data?.user?.username
      ? setUsername(data?.user?.username)
      : setUsername(data?.user?._id);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.API}/user/profile/username`, {
        method: "PUT",
        body: JSON.stringify({
          username,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.err);
        setLoading(false);
        return;
      } else {
        update({ ...data?.user, username });
        toast.success("Username updated successfully");
        router.back();
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
        <div className="row d-flex justify-content-center align-items-center vh-80">
          <div className="col-lg-5 p-4 shadow">
            <h2 className="mb-4 lead fw-bold">Settings</h2>

            <label className="my-2 form-text">Update Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control p-3 mb-4"
              placeholder="Your username"
            />

            <button
              className="btn btn-lg w-100 btn-primary w-100 mb-2"
              disabled={loading || !username}
              onClick={handleSubmit}
            >
              {loading ? "Please wait.." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
