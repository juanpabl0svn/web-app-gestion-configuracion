"use client";

import { useAuth } from "@/context/auth/auth.context";
import { useState } from "react";
import { ILIST } from "@/models/user";
import POST from "@/utils/POST";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function Main() {
  const { username, list, updateList } = useAuth();

  const [textLength, setTextLength] = useState(0);

  function deleteMessage(index: number) {
    const newList = list.filter((_, i) => i !== index);
    try {
      POST("/delete", { username, list: newList });
      updateList(newList);
    } catch (e) {
      toast.error("Error al eliminar");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    toast.remove();

    const { length } = e.target.value.trim();

    if (length > 255) {
      toast.error("El texto no puede exceder los 255 caracteres");
      e.target.value = e.target.value.slice(0, 255);
      return;
    }

    setTextLength(length);
  }

  function handleKeydown(
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      e.preventDefault();

      (
        (e.target as HTMLTextAreaElement)
          .nextElementSibling as HTMLButtonElement
      )?.click();
    }
  }

  async function handleWordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.remove();
    const word = (e.target as HTMLFormElement).word.value;

    const text = document.querySelector("#text") as HTMLTextAreaElement;

    const wordsInText = text.value
      .split(" ")
      .filter((w) => w.toLocaleLowerCase() === word.toLowerCase()).length;

    const wordsInNotes = [...list].reduce(
      (acc, { label }: { label: string }) => {
        return (
          acc +
          label.split(" ").filter((w) => w.toLowerCase() === word.toLowerCase())
            .length
        );
      },
      0
    );

    const total = wordsInText + wordsInNotes;

    if (total === 0) {
      toast.error(
        "No se ha encontrado la palabra ni en el texto ni en la notas"
      );
      return;
    }

    toast.success(`Se ha encontrado la palabra ${word}, ${total} veces`);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.remove();
    const text = (e.target as HTMLFormElement).text.value;

    if (text == "") return;

    const newList: ILIST[] = [
      ...list,
      { id: crypto.randomUUID(), label: text },
    ];

    try {
      await Swal.fire({
        title: "¿Quieres agregar este texto?",
        showDenyButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `Salir`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          POST("/add", { username, list: newList });
          updateList(newList);
          toast.success("Guardado con exito");
          (e.target as HTMLFormElement).text.value = "";
          setTextLength(0);
        } else if (result.isDenied) {
          toast.error("No se ha guardado el text");
        }
      });
    } catch (e) {
      toast.error("Error al guardar");
    }
  }

  return (
    <main>
      <aside className="w-full flex justify-center items-center flex-col mt-8 gap-6">
        <form
          className="w-full max-w-[300px] h-full py-3 bg-green-400/60 rounded-lg border border-green-700/40 shadow-lg flex flex-col items-center gap-5"
          onSubmit={handleWordSubmit}
        >
          <label htmlFor="word" className="text-white">
            Palabra a buscar:
          </label>
          <input
            type="text"
            id="word"
            className=" px-3 w-3/4 rounded-md outline-green-700"
            onKeyDown={handleKeydown}
          />
          <button className="px-3 py-2 bg-green-600/80 rounded-lg text-white hover:scale-105 transition-all duration-300 ease-in-out">
            Buscar
          </button>
        </form>
        <form
          onSubmit={handleSubmit}
          className="w-[clamp(500px,60vw,800px)] min-h-44 h-full bg-green-400/60 rounded-lg border border-green-700/40 shadow-lg flex flex-col items-center pt-4"
        >
          <span className="text-gray-600 text-sm mb-2 opacity-80">
            {textLength}/255
          </span>
          <textarea
            name="text"
            id="text"
            className=" w-3/4 resize-none rounded-md px-4 py-2 outline-green-800"
            onKeyDown={handleKeydown}
            onChange={handleChange}
          ></textarea>
          <button className="px-3 py-2 bg-green-600/80 rounded-lg mt-4 text-white hover:scale-105 transition-all duration-300 ease-in-out">
            Guardar
          </button>
        </form>
      </aside>

      <article className="w-full h-full flex flex-wrap p-8 gap-8 justify-center items-center">
        {list.length > 0 &&
          list.map(({ id, label }, index) => (
            <section
              key={id}
              className="min-h-10 h-fit bg-blue-300 px-10 py-5 max-w-64 w-fit rounded-md text-white relative"
            >
              <p className=" break-words">{label}</p>
              <span
                onClick={() => deleteMessage(index)}
                className="bg-blue-600 rounded-full h-5 aspect-square cursor-pointer absolute -right-2 -top-2 grid place-content-center"
              >
                x
              </span>
            </section>
          ))}
      </article>
    </main>
  );
}
