import Link from "next/link";

export default function AuthorNav() {
  return (
    <>
      <nav className="nav justify-content-center">
        <Link className="nav-link" href="/dashboard/author">
          Author
        </Link>
        <Link className="nav-link" href="/blog/create">
          Write a Blog
        </Link>
        <Link className="nav-link" href="/dashboard/author/blogs">
          My Blogs
        </Link>
        <Link className="nav-link" href="/dashboard/author/blogs/liked">
          Liked Blogs
        </Link>
        <Link className="nav-link" href="/dashboard/user/comments">
          My Comments
        </Link>
        <Link className="nav-link" href="/dashboard/user/settings">
          Settings
        </Link>
      </nav>
    </>
  );
}
