"use client";

import POST from "@/utils/POST";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const STYLES = [
  ["", "", "0%"],
  ["Insegura", "#ff0000", "30%"],
  ["Insegura", "#F79F00", "50%"],
  ["Segura", "#00ff00", "100%"],
];

const handlePasswordStrength = (e: React.ChangeEvent<HTMLInputElement>) => {
  toast.remove();
  const password = e.target.value;

  const passwordSecureBar = e.target.nextSibling?.childNodes[0]
    ?.childNodes[0] as HTMLElement;
  const passwordSecureText = e.target.nextSibling?.childNodes[1] as HTMLElement;

  let security = 0;

  const hasNumbers = /\d/.test(password);

  if (hasNumbers) {
    e.target.value = password.replace(/\d/g, "");
    return toast.error("La contraseña no puede contener números");
  }

  const hasUppercase = /[A-Z]/.test(password);

  const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    password
  );

  const { length } = password;

  if (length === 0) {
    passwordSecureBar.style.backgroundColor = "#ffffff";
    passwordSecureBar.style.width = "0%";
    passwordSecureText.style.opacity = "0";
    return;
  }

  passwordSecureText.style.opacity = "100%";

  security = 0;

  if (length > 4) {
    security++;
  }
  if (hasUppercase) {
    security++;
  }
  if (hasSpecialCharacters) {
    security++;
  }

  const [text, color, width] = STYLES[security] ?? ["", "", "0%"];

  passwordSecureText.textContent = text;
  passwordSecureBar.style.backgroundColor = color;
  passwordSecureBar.style.width = width;
};

export default function Register() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { name, username, email, password, password2 } =
      Object.fromEntries(formData);

    if (!name || !username || !email || !password || !password2) {
      alert("Please fill all fields");
      return;
    }

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await POST("/register", { email, password, username, name });
      document.cookie = `token-web-app=${username}`;
      router.replace("/main");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] h-full py-20">
      <Toaster />
      <aside className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            placeholder="Nombre"
            name="name"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150"
            type="text"
          />
          <input
            placeholder="Usuario"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150"
            type="text"
            name="username"
          />
          <input
            placeholder="Email"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150"
            type="email"
            name="email"
          />
          <input
            placeholder="Contraseña"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-1 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150"
            type="password"
            onChange={handlePasswordStrength}
            name="password"
          />

          <div className="flex items-center justify-center h-9 gap-3 px-4 overflow-hidden">
            <div
              id="password-secure"
              className="w-full h-4 border-2 border-bg-green-500 rounded-xl overflow-hidden"
            >
              <div
                id="bg-color"
                className="h-full transition-all ease-in-out duration-300"
              ></div>
            </div>
            <span className="flex items-center h-full min-w-14 transition-all ease-in-out duration-300"></span>
          </div>
          <input
            placeholder="Confirmar contraseña"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150"
            type="password"
            name="password2"
          />

          <p className="text-gray-900 mt-4">
            ¿Ya tienes una cuenta?
            <Link
              href="/login"
              className="text-sm text-green-500 -200 hover:underline mt-4 ml-1"
            >
              Iniciar sesión
            </Link>
          </p>
          <button
            className="bg-gradient-to-r from-green-300 to-green-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-green-600 transition ease-in-out duration-150"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </aside>
    </main>
  );
}
