"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "@/components/nav/TopNav";
import { ThemeProvider } from "@/context/theme";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { BlogProvider } from "@/context/blog";
import { SearchProvider } from "@/context/search";
import FooterNav from "@/components/nav/FooterNav";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        <SessionProvider>
          <ThemeProvider>
            <BlogProvider>
              <SearchProvider>
                <TopNav />
                <Toaster />
                {/* children props/components can be server rendered */}
                {children}
                <FooterNav />
              </SearchProvider>
            </BlogProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
