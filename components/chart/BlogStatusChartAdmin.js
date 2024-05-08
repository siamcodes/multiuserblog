"use client";
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function BlogStatsChartAdmin({
  publishedBlogsCount,
  unpublishedBlogsCount,
}) {
  const chartRef = useRef(null);

  console.log("publishedBlogsCount", publishedBlogsCount);
  console.log("unPublishedBlogsCount", unpublishedBlogsCount);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      // pie polarArea radar doughnut bar
      type: "pie",
      data: {
        labels: ["Published Blogs", "Unpublished Blogs"],
        datasets: [
          {
            data: [publishedBlogsCount, unpublishedBlogsCount],
            backgroundColor: ["#36A2EB", "#FFCE56"],
          },
        ],
      },
    });
  }, [publishedBlogsCount, unpublishedBlogsCount]);

  return <canvas ref={chartRef} />;
}
