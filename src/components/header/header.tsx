"use client";

import { useAuth } from "@/context/auth/auth.context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { isAuth, logOut } = useAuth();

  const pathname = usePathname();

  const handleLogOut = () => {
    document.cookie = `token-web-app=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    logOut();
    router.replace("/");
  };
  return (
    <header className="h-20 w-full bg-green-300 shadow-xl flex justify-center  items-center text-white relative [&>*]:transition-all[&>*]:duration-300 [&>*]:ease-in-out">
      <Link
        className={`border-l border-r border-green-200 h-full flex items-center w-28 justify-center hover:bg-green-400 ${
          pathname === "/" ? "bg-green-400" : ""
        }`}
        href="/"
      >
        Home
      </Link>
      {isAuth ? (
        <>
          <Link
            className={`border-r border-green-200 h-full flex items-center w-28 justify-center hover:bg-green-400 ${
              pathname === "/main" ? "bg-green-400" : ""
            }`}
            href="/main"
          >
            Main
          </Link>
          <button
            onClick={handleLogOut}
            className={`absolute right-2 bg-gray-300 px-3 py-1 border border-gray-400 rounded-full cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out opacity-75 hover:opacity-100`}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link
            className={`border-r border-green-200 h-full flex items-center w-28 justify-center hover:bg-green-400 ${
              pathname === "/login" ? "bg-green-400" : ""
            }`}
            href="/login"
          >
            Login
          </Link>
          <Link
            className={`border-r border-green-200 h-full flex items-center w-28 justify-center hover:bg-green-400 ${
              pathname === "/register" ? "bg-green-400" : ""
            }`}
            href="/register"
          >
            Register
          </Link>
        </>
      )}
    </header>
  );
}
