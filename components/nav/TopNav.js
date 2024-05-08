"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/context/theme";
import { useBlog } from "@/context/blog";
import { useSearch } from "@/context/search";

export default function TopNav() {
  const { data, status, loading } = useSession();

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { tags, tagList } = useBlog();
  const { searchQuery, setSearchQuery, fetchSearchResults } = useSearch();

  // console.log("THEME in TOPNAV => ", theme);
  // state
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    tagList();
  }, []);

  useEffect(() => {
    const navHeight = document.querySelector(".nav").offsetHeight;

    const handleScroll = () => {
      if (window.scrollY > navHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`nav shadow justify-content-between mb-2 fixed-top bg-${theme} ${
          isScrolled ? "opacity-75" : "opacity-100"
        }`}
      >
        <div className="d-flex justify-content-start">
          <Link className="nav-link mt-2" href="/">
            {/* cyclone */}
            👱 🗒️ 🌀 <span className="visually-hidden">{theme}</span>
          </Link>

          <Link className="nav-link mt-2" href="/blog/create">
            Write a Blog
          </Link>
        </div>

        <div className="d-flex justify-content-center">
          <form
            className="d-flex mx-2"
            role="search"
            onSubmit={fetchSearchResults}
          >
            <input
              className="form-control m-2"
              type="search"
              placeholder="Search blogs"
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </form>
        </div>

        <div className="d-flex align-items-center">
          {status === "authenticated" ? (
            <>
              <Link className="nav-link" href={`/dashboard/user`}>
                {data.user.name}
              </Link>

              {data?.user?.role
                ?.filter((r) => r !== "subscriber") // Filter out the "subscriber" role
                .map((r) => (
                  <Link className="nav-link" href={`/dashboard/${r}`} key={r}>
                    {r}
                  </Link>
                ))}

              <a
                className="nav-link pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <Link className="nav-link" href="/login">
                Login
              </Link>
              <Link className="nav-link" href="/register">
                Register
              </Link>
            </>
          )}
          <a className="nav-link">
            <ThemeToggle />
          </a>
        </div>
      </nav>
      <br />
      <br />
      <br />
      <div className="d-block d-lg-none" style={{ marginBottom: "12%" }}></div>
    </>
  );
}
