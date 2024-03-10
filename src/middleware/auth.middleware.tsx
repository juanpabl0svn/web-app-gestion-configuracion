import POST from "@/utils/POST";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AuthMiddleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token-web-app");

  if (!token) return children;

  return POST("/auth/verify", { token })
    .then((data) => {
      if (!data) return redirect("/");
      return children;
    })
    .catch((error) => {
      console.error("Error verifying token:", error);
      return redirect("/");
    });
}
