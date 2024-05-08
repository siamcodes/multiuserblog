import md from "@/utils/md";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export function createExcerpt(content) {
  // Parse the Markdown content to HTML
  const htmlContent = md.render(content);

  // Remove images, render headings and blockquotes as paragraphs, and truncate to 160 characters
  const excerpt = htmlContent
    .replace(/<img.*?>/g, "")
    .replace(/<(h[1-6]|blockquote).*?>/g, "<p>")
    .substring(0, 160);

  // Remove any incomplete HTML tags at the end and append "..." if truncated
  return (
    excerpt.replace(/<[^>]*$/, "") + (htmlContent.length > 160 ? "..." : "")
  );
}

export const currentUser = async () => {
  const session = await getServerSession(authOptions);
  return session.user;
};
