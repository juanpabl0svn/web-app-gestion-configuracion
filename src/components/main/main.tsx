"use client";

import { useAuth } from "@/context/auth/auth.context";
import Header from "../header/header";
import { useEffect } from "react";

export default function Main() {
  const {username} = useAuth();

  useEffect(() => {
    console.log(username);
  }, [username]);

  return (
    <main>
      <Header />
      <aside className="w-full flex justify-center mt-8">
        <form className="w-[clamp(500px,60vw,800px)] min-h-44 h-full bg-green-400/60 rounded-lg border border-green-700/40 shadow-lg flex flex-col items-center pt-4">
          <span className="text-gray-600 text-sm mb-2 opacity-80">
            Max. 255 caracteres
          </span>
          <textarea className=" w-3/4 resize-none rounded-md px-4 py-2"></textarea>
          <button className="px-3 py-2 bg-green-600/80 rounded-lg mt-4 text-white hover:scale-105 transition-all duration-300 ease-in-out">
            Guardar
          </button>
        </form>
      </aside>
    </main>
  );
}
