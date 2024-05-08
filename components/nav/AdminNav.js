import Link from "next/link";

export default function AdminNav() {
  return (
    <>
      <nav className="nav justify-content-center mb-3">
        <Link className="nav-link" href="/dashboard/admin">
          Admin
        </Link>
        <Link className="nav-link" href="/dashboard/admin/blogs">
          Blogs
        </Link>
        <Link className="nav-link" href="/dashboard/admin/tags">
          Tags
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
