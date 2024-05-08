import UserNav from "@/components/nav/UserNav";

export default function UserLayout({ children }) {
  return (
    <>
      <UserNav />
      {children}
    </>
  );
}
