"use client";

import { useAuth } from "@/context/auth/auth.context";
import { useState } from "react";
import { ILIST } from "@/models/user";
import POST from "@/utils/POST";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

import File from "@/svg/file";

export default function Main() {
  const { username, list, updateList } = useAuth();

  const [textLength, setTextLength] = useState(0);

  const [isFile, setIsFile] = useState<string | null>(null);

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

  const handleIsPalindrom = () => {
    toast.remove();
    const text = document.querySelector("#word") as HTMLTextAreaElement;

    const textValue = text.value;

    if (textValue.trim() === "") {
      toast.error("No hay texto para evaluar");
      return;
    }
    const textValueReverse = textValue.split("").reverse().join("");

    if (textValue === textValueReverse) {
      toast.success("El texto es palindromo");
    } else {
      toast.error("El texto no es palindromo");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const result = reader.result as string;

      setIsFile(result);
    };
  };

  const removeFile = () => {
    setIsFile(null);
    (document.querySelector("#file") as HTMLInputElement).value = "";
  };

  async function handleWordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.remove();
    const word = (e.target as HTMLFormElement).word.value;

    if (word.trim() === "") {
      toast.error("No hay palabra para buscar");
      return;
    }

    if (isFile) {

      const fileCleaned = isFile.replace(/\n+/g, ' ') // Removes jump lines
      


      const wordsInFile = fileCleaned
        .split(" ")
        .filter((w) => w.toLocaleLowerCase().replace(/\n+/g, ' ') === word.toLowerCase()).length;

      if (wordsInFile === 0) {
        toast.error("No se ha encontrado la palabra en el archivo");
        return;
      }

      toast.success(
        `Se ha encontrado la palabra ${word}, ${wordsInFile} veces`
      );
      return;
    }

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

    if (text.trim() == "") return toast.error("No hay texto para guardar");

    const newList: ILIST[] = [
      ...list,
      { id: `${Math.random()}-${Math.random()}`, label: text },
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
          <div className="w-[80%] px-3 flex gap-2">
            <input
              type="file"
              name="file"
              id="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".txt"
            />
            {isFile ? (
              <span
                onClick={removeFile}
                className="text-white bg-red-600 rounded-md px-2 cursor-pointer"
              >
                X
              </span>
            ) : (
              <label
                htmlFor="file"
                className="hover:bg-white transition-all duration-200 ease-in-out rounded-md cursor-pointer"
              >
                <File />
              </label>
            )}

            <input
              type="text"
              id="word"
              className="w-full  rounded-md outline-green-700"
              onKeyDown={handleKeydown}
            />
          </div>
          <div className="flex gap-3">
            <button className="px-3 py-2 bg-green-600/80 rounded-lg text-white hover:scale-105 transition-all duration-300 ease-in-out">
              Buscar
            </button>
            <button
              onClick={handleIsPalindrom}
              type="button"
              className="px-3 py-2 bg-blue-600/80 rounded-lg text-white hover:scale-105 transition-all duration-300 ease-in-out"
            >
              ¿Es palindromo?
            </button>
          </div>
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
