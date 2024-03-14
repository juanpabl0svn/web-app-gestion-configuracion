"use client";

import { useAuth } from "@/context/auth/auth.context";
import Header from "../header/header";
import { useEffect } from "react";
import { ILIST } from "@/models/user";
import POST from "@/utils/POST";

import toast from "react-hot-toast";

export default function Main() {
  const { username, list, updateList } = useAuth();

  function handleKeydown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();

      (
        (e.target as HTMLTextAreaElement)
          .nextElementSibling as HTMLButtonElement
      )?.click();
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = (e.target as HTMLFormElement).text.value;

    console.log(text);

    if (text == "") return;

    const newList: ILIST[] = [
      ...list,
      { id: crypto.randomUUID(), label: text },
    ];

    try {
      POST("/add", { username, list: newList });
      updateList(newList);
      toast.success("Guardado con exito");
    } catch (e) {
      toast.error("Error al guardar");
    } finally {
      (e.target as HTMLFormElement).text.value = "";
    }
  }

  return (
    <main>
      <Header />
      <aside className="w-full flex justify-center mt-8">
        <form
          onSubmit={handleSubmit}
          className="w-[clamp(500px,60vw,800px)] min-h-44 h-full bg-green-400/60 rounded-lg border border-green-700/40 shadow-lg flex flex-col items-center pt-4"
        >
          <span className="text-gray-600 text-sm mb-2 opacity-80">
            Max. 255 caracteres
          </span>
          <textarea
            name="text"
            id="text"
            className=" w-3/4 resize-none rounded-md px-4 py-2"
            onKeyDown={handleKeydown}
          ></textarea>
          <button className="px-3 py-2 bg-green-600/80 rounded-lg mt-4 text-white hover:scale-105 transition-all duration-300 ease-in-out">
            Guardar
          </button>
        </form>
      </aside>

      <article className="w-full h-full flex flex-wrap p-8 gap-8 justify-center">
        {list.length > 0 &&
          list.map(({ id, label }) => (
            <section
              key={id}
              className="min-h-10 bg-blue-300 px-10 py-5 max-w-64 w-fit rounded-md text-white"
            >
              <p>{label}</p>
            </section>
          ))}
      </article>
    </main>
  );
}
