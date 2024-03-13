import Header from "../header/header";

export default function Landing() {
  return (
    <main className="min-h-dvh h-full mb-10  relative flex flex-col items-center">
      <Header/>
      <article className="text-center relative max-w-[1200px]">
        <h1 className="text-6xl mt-5">
          Bienvenido a
          <span className="ml-3 font-bold from-stone-600 inline-block">
            Copy&Save
          </span>
        </h1>
        <aside className="w-[clamp(200px,45%,600px)] border border-black border-solid p-3 rounded-xl absolute left-20 top-40 ">
          <p>
            Copy&Save es una aplicación web que te permite guardar tus textos
            favoritos para leerlos cuando quieras.
          </p>
          <p>
            Para empezar, inicia sesión o registrate para empezar a guardar tus
            textos.
          </p>
        </aside>
        <aside className="w-[clamp(200px,30%,600px)] border border-black border-solid p-8 rounded-xl absolute top-44 right-6">
          <p>
            Copy&Save es una aplicación web que te permite guardar tus textos
            favoritos para leerlos cuando quieras.
          </p>
          <p>
            Para empezar, inicia sesión o registrate para empezar a guardar tus
            textos.
          </p>
        </aside>
        <aside className="w-[clamp(250px,50%,600px)] border-2 border-black border-solid p-3 absolute left-16 top-[25rem] min-h-32  rounded-tl-lg rounded-br-lg">
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
