import BlogCard from "@/components/blog/view/BlogCard";
import Pagination from "@/components/blog/view/Pagination";
import ContactAuthor from "@/components/contact/ContactAuthor";

export async function generateMetadata({ params }) {
  const { user } = await getProfile(params?.username);
  return {
    title: `${user?.name}'s blogs`,
    description: `Read latest blogs by ${user?.name} on react node nextjs and other web development topics`,
  };
}

async function getProfile(username, page = 1) {
  const response = await fetch(
    `${process.env.API}/profile/${username}?page=${page}`,
    {
      method: "GET",
      next: { revalidate: 1 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch blogs.");
  }

  return await response.json();
}

export default async function UserPublicProfile({ params, searchParams }) {
  const { user, blogs, totalBlogs, totalPages } = await getProfile(
    params?.username,
    searchParams?.page
  );

  // updated json version of user
  const u = {
    blogsBy: user.name,
    ...user,
    joined: new Date(user.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    totalBlogs,
  };
  delete u.name;
  delete u.email;
  delete u.createdAt;

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {/* <pre className="lead text-primary fw-bold col-lg-6">
            {JSON.stringify(u, null, 4)}
          </pre> */}
          <div className="col-lg-6">
            <ContactAuthor emailTo={user?.email} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mb-5">
          <br />
          {blogs?.map((blog) => (
            <div className="col-lg-4" key={blog?._id}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>

        <Pagination page={searchParams?.page} totalPages={totalPages} />
      </div>
    </>
  );
}
