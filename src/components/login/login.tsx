"use client";

import Link from "next/link";

export default function LogIn() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { email, password } = e.target as HTMLFormElement;
    email;

    if (!email.value) return;
    if (!password.value) return;
  }

  return (
    <main className="w-full min-h-dvh h-full grid place-content-center">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Email address"
            />
            <input
              type="password"
              name="password"
              id="password"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Password"
            />
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
      </div>
    </main>
  );
}
