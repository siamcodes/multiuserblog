"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

export default function BlogLike({ blog }) {
  const { data, status } = useSession();
  const [likes, setLikes] = useState(blog?.likes);

  const router = useRouter();
  const pathname = usePathname();

  // check if current user has already liked this blog
  const isLiked = likes?.includes(data?.user?._id);

  const handleLike = async () => {
    if (status !== "authenticated") {
      toast.error("Please login to like");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }
    try {
      const method = isLiked ? "PUT" : "POST";
      const response = await fetch(`${process.env.API}/user/blog/like`, {
        method,
        body: JSON.stringify({
          blogId: blog._id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isLiked ? "unlike" : "like"}`);
      }

      const data = await response.json();
      setLikes(data.likes);
      toast.success(`Blog ${isLiked ? "unliked" : "liked"}`);
    } catch (err) {
      console.log(err);
      toast.error(`Failed to ${isLiked ? "unlike" : "like"}`);
    }
  };

  return (
    <button onClick={handleLike} className="btn">
      ❤️ {likes?.length} {likes?.length > 1 ? "likes" : "like"}
    </button>
  );
}
