"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default async function Pagination({ page, totalPages }) {
  const pathname = usePathname();

  return (
    <nav className="d-flex justify-content-center fixed-bottom opacity-75">
      <ul className="pagination mb-4 shadow">
        {/* show prev */}
        {page > 1 && (
          <li className="page-item">
            <Link
              className="page-link"
              href={`${pathname}?page=${parseInt(page) - 1}`}
              as={`${pathname}?page=${parseInt(page) - 1}`}
            >
              Previous
            </Link>
          </li>
        )}

        {Array.from({ length: totalPages }, (_, index) => {
          const p = index + 1;
          return (
            <li key={p} className="page-item">
              <Link
                className={`page-link ${page == p ? "active" : ""}`}
                href={`${pathname}?page=${p}`}
                as={`${pathname}?page=${p}`}
              >
                {p}
              </Link>
            </li>
          );
        })}

        {/* show next */}
        {page < totalPages && (
          <li className="page-item">
            <Link
              className="page-link"
              href={`${pathname}?page=${parseInt(page) + 1}`}
              as={`${pathname}?page=${parseInt(page) + 1}`}
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
