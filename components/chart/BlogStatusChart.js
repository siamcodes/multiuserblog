// "use client";
// import { useEffect, useRef } from "react";
// import { Chart } from "chart.js/auto";

// export default function BlogStatsChart({ blogsCreated, blogsLiked }) {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");
//     const chart = new Chart(ctx, {
//       // pie polarArea radar doughnut bar
//       type: "pie",
//       data: {
//         labels: ["Blogs Created", "Blogs Liked"],
//         datasets: [
//           {
//             data: [blogsCreated, blogsLiked],
//             backgroundColor: ["#36A2EB", "#FFCE56"],
//           },
//         ],
//       },
//     });
//   }, [blogsCreated, blogsLiked]);

//   return <canvas ref={chartRef} />;
// }

import React from "react";

export default function BlogStatusChart() {
  return <div>BlogStatusChart</div>;
}
