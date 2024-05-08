import BlogStatsChart from "@/components/chart/BlogStatusChart";
import { cookies } from "next/headers";

async function getChartData() {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const response = await fetch(`${process.env.API}/user/chart-data`, {
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

export default async function AuthorDashboard() {
  const { blogsCreatedCount, blogsLikedCount } = await getChartData();

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead">Author Dashboard</p>
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="d-flex justify-content-center align-items-center vh-90 col-lg-6 offset-lg-3">
          <BlogStatsChart
            blogsCreated={blogsCreatedCount}
            blogsLiked={blogsLikedCount}
          />
        </div>
      </div>
    </div>
  );
}
