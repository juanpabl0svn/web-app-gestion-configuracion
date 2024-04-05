import { useEffect } from "react";
import Header from "../header/header";
import POST from "@/utils/POST";
import { useAuth } from "@/context/auth/auth.context";
import { IUSER } from "@/models/user";
import { AxiosResponse } from "axios";

export default function Landing() {
  const { logIn } = useAuth();

  useEffect(() => {
    const user = document.cookie.replace(
      /(?:(?:^|.*;\s*)token-web-app\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (user) {
      POST("/auth/verify", { token: user })
        .then((data: AxiosResponse<IUSER>) => {
          logIn(data.data);
        })
        .catch(console.log);
    }
  }, []);

  return (
    <main className="min-h-dvh h-full mb-10  relative flex flex-col items-center">
      <article className="text-center relative max-w-[900px] flex flex-col items-center gap-10 w-full">
        <h1 className="text-6xl mt-5">
          Bienvenido a
          <span className="ml-3 font-bold from-stone-600 block">Copy&Save</span>
        </h1>
        <aside className="w-[clamp(200px,45%,600px)] border border-black border-solid p-3 rounded-xl sm:absolute sm:left-20 sm:top-48 ">
          <p>
            Copy&Save es una aplicación web que te permite guardar tus textos
            favoritos para leerlos cuando quieras.
          </p>
          <p>
            Para empezar, inicia sesión o registrate para empezar a guardar tus
            textos.
          </p>
        </aside>
        <aside className="w-[clamp(200px,30%,600px)] border border-black border-solid p-8 rounded-xl sm:absolute sm:top-48 sm:right-6">
          <p>
            Copy&Save es una aplicación web que te permite guardar tus textos
            favoritos para leerlos cuando quieras.
          </p>
          <p>
            Para empezar, inicia sesión o registrate para empezar a guardar tus
            textos.
          </p>
        </aside>
        <aside className="w-[clamp(250px,50%,600px)] border-2 border-black border-solid p-3 sm:absolute sm:left-16 sm:top-[27rem] min-h-32  rounded-lg shadow-2xl">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
            aperiam numquam dolorum. Soluta enim libero dolorem fuga quam,
            deserunt consequatur iusto eveniet tempore expedita iste modi
            voluptate tempora ad atque.
          </p>
        </aside>
      </article>
      <footer className="absolute -bottom-40 mt-10 h-10 w-full"></footer>
    </main>
  );
}
