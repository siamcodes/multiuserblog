import BlogStatsChartAdmin from "@/components/chart/BlogStatusChartAdmin";
import { cookies } from "next/headers";

async function getChartData() {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const response = await fetch(`${process.env.API}/admin/chart-data`, {
    method: "GET",
    headers: {
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    },
    next: { revalidate: 1 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }
  const data = await response.json();
  return data;
}

export default async function AdminDashboard() {
  const { publishedBlogsCount, unpublishedBlogsCount } = await getChartData();

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead">Admin Dashboard</p>
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="d-flex justify-content-center align-items-center vh-90 col-lg-6 offset-lg-3">
          <BlogStatsChartAdmin
            publishedBlogsCount={publishedBlogsCount}
            unpublishedBlogsCount={unpublishedBlogsCount}
          />
        </div>
      </div>
    </div>
  );
}
