import Link from "next/link";

export default function UserNav() {
  return (
    <>
      <nav className="nav justify-content-center mb-2">
        <Link className="nav-link" href="/dashboard/user">
          User
        </Link>
        <Link className="nav-link" href="/blog/create">
          Write a Blog
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
