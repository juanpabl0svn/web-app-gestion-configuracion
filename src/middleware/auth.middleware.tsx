import POST from "@/utils/POST";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthProvider from "@/context/auth/auth.context";
import SetUser from "@/utils/set-user";

export default function AuthMiddleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token-web-app")?.value;

  if (!token) return redirect("/login");

  return POST("/auth/verify", { token })
    .then((data) => {
      if (data) return <SetUser data={data.data}>{children}</SetUser>;
      throw new Error("Something went wrong");
    })
    .catch(() => redirect("/login"));
}
