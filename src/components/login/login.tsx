"use client";

import EyeClose from "@/svg/eye-close";
import EyeOpen from "@/svg/eye-open";
import POST from "@/utils/POST";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogIn() {
  const [type, setType] = useState("password");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { username, password } = e.target as HTMLFormElement;
    username;

    if (!username.value) return;
    if (!password.value) return;

    try {
      const req = await POST("/login", {
        username: username.value,
        password: password.value,
      });
      document.cookie = `token-web-app=${username.value}`;

      router.replace("/main");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="w-full min-h-[calc(100vh-5rem)] h-full grid place-content-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
        <form className="flex flex-col relative" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Username"
          />
          <input
            type={type}
            name="password"
            id="password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
          />
          {type === "password" ? (
            <EyeClose
              className="absolute right-2 top-[75px] -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-100 transition-all duration-200 ease-in-out w-8 aspect-square"
              onClick={() => setType("text")}
            />
          ) : (
            <EyeOpen
              className="absolute right-2 top-[75px] -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-100 transition-all duration-200 ease-in-out w-8 aspect-square"
              onClick={() => setType("password")}
            />
          )}

          <div className="flex items-center justify-between flex-wrap">
            <label
              htmlFor="remember-me"
              className="text-sm text-gray-900 cursor-pointer flex items-center"
            >
              <input
                type="checkbox"
                id="remember-me"
                className="mr-2 cursor-pointer"
              />
              Recuerdame
            </label>

            <Link
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline mb-0.5 cursor-pointer"
            >
              ¿Olvidaste tu contraseña?
            </Link>

            <p className="text-gray-900 mt-4">
              No tienes cuenta?
              <Link
                href="/register"
                className="text-sm text-blue-500 -200 hover:underline mt-4 ml-1 cursor-pointer"
              >
                Crea una
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
