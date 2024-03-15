"use client";

import EyeClose from "@/svg/eye-close";
import EyeOpen from "@/svg/eye-open";
import POST from "@/utils/POST";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const [type, setType] = useState({ type1: "password", type2: "password" });

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { username, password } = e.target as HTMLFormElement;
    username;

    if (!username.value) return;
    if (!password.value) return;

    try {
      await POST("/login", {
        username: username.value,
        password: password.value,
      });
      document.cookie = `token-web-app=${username.value}`;

      router.push("/main");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="w-full min-h-dvh h-full grid place-content-center">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recuperar contraseña
          </h2>
          <form className="flex flex-col relative" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Username"
            />
            <input
              type={type.type1}
              name="password"
              id="password"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="New password"
            />
            {type.type1 === "password" ? (
              <EyeClose
                className="absolute right-2 top-[75px] -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-100 transition-all duration-200 ease-in-out w-8 aspect-square"
                onClick={() => setType({ ...type, type1: "text" })}
              />
            ) : (
              <EyeOpen
                className="absolute right-2 top-[75px] -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-100 transition-all duration-200 ease-in-out w-8 aspect-square"
                onClick={() => setType({ ...type, type1: "password" })}
              />
            )}

            <input
              type={type.type2}
              name="password"
              id="password"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Repeat new password"
            />
            {type.type2 === "password" ? (
              <EyeClose
                className="absolute right-2 top-[135px] -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-100 transition-all duration-200 ease-in-out w-8 aspect-square"
                onClick={() => setType({ ...type, type2: "text" })}
              />
            ) : (
              <EyeOpen
                className="absolute right-2 top-[135px] -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-100 transition-all duration-200 ease-in-out w-8 aspect-square"
                onClick={() => setType({ ...type, type2: "password" })}
              />
            )}

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Login
            </button>
            <div className="mt-4 flex items-center justify-center flex-wrap ">
              <Link
                href="/login"
                className=" text-sm text-blue-500 hover:underline mb-0.5 cursor-pointer"
              >
                Volver
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
