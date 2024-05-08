import AuthorNav from "@/components/nav/AuthorNav";

export default function AuthorLayout({ children }) {
  return (
    <>
      <AuthorNav />
      {children}
    </>
  );
}
