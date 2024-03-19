"use client";

import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const handlePasswordStrength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    const passwordSecureBar = e.target.nextSibling?.childNodes[0]
      ?.childNodes[0] as HTMLElement;
    const passwordSecureText = e.target.nextSibling
      ?.childNodes[1] as HTMLElement;

    if (password.length === 0) {
      passwordSecureBar.style.backgroundColor = "#ffffff";
      passwordSecureBar.style.width = "0%";
      passwordSecureText.style.opacity = "0";
      return;
    }

    passwordSecureText.style.opacity = "100%";

    if (password.length < 6) {
      passwordSecureBar.style.backgroundColor = "#ff0000";
      passwordSecureBar.style.width = "30%";
      passwordSecureText.textContent = "Insegura";
    } else if (password.length < 10) {
      passwordSecureBar.style.backgroundColor = "#ffcc00";
      passwordSecureBar.style.width = "80%";

      passwordSecureText.textContent = "Regular";
    } else {
      passwordSecureBar.style.backgroundColor = "#00ff00";
      passwordSecureBar.style.width = "100%";

      passwordSecureText.textContent = "Segura";
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen h-full py-20">
      <aside className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h2>
        <form className="flex flex-col">
          <input
            placeholder="First Name"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
          />
          <input
            placeholder="Last Name"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
          />
          <input
            placeholder="Email"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
          />
          <input
            placeholder="Confirm Email"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
          />
          <input
            placeholder="Password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-1 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            onChange={handlePasswordStrength}
          />

          <div className="flex items-center justify-center h-9 gap-3 px-4 overflow-hidden">
            <div
              id="password-secure"
              className="w-full h-4 border-2 border-bg-blue-500 rounded-xl overflow-hidden"
            >
              <div
                id="bg-color"
                className="h-full transition-all ease-in-out duration-300"
              ></div>
            </div>
            <span className="flex items-center h-full min-w-14 transition-all ease-in-out duration-300"></span>
          </div>
          <input
            placeholder="Confirm Password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
          />
          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label
            className="text-sm mb-2 text-gray-900 cursor-pointer"
            htmlFor="age"
          >
            Age
          </label>
          <input
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2"
            id="age"
            type="date"
          />
          <p className="text-gray-900 mt-4">
            ¿Ya tienes una cuenta?
            <Link
              href="/login"
              className="text-sm text-blue-500 -200 hover:underline mt-4 ml-1"
            >
              Iniciar sesión
            </Link>
          </p>
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </aside>
    </main>
  );
}
