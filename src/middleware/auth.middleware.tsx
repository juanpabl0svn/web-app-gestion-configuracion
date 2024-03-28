import POST from "@/utils/POST";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthProvider from "@/context/auth/auth.context";

export default function AuthMiddleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token-web-app")?.value;

  if (!token) return redirect("/login");


  return POST("/auth/verify", { token })
    .then((data) => {
      if (data) return <AuthProvider data={data.data}>{children}</AuthProvider>;
      throw new Error("Something went wrong");
    })
    .catch(() => redirect("/login"));
}
