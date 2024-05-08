import Link from "next/link";

export default function FooterNav() {
  return (
    <div className="d-flex justify-content-between shadow">
      <p className="m-2">&copy; {new Date().getFullYear()}</p>
      <Link href="/contact" className="nav-link m-2">
        Dev by Somkiat.J
      </Link>
    </div>
  );
}
