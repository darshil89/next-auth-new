import Link from "next/link";
import Register from "./register/page";
export default function Home() {
  return (
    <>
      {/* Registeration Page and login page */}
      <div className="flex flex-col  mb-4">
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
      </div>
    </>
  );
}
