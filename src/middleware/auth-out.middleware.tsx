import POST from "@/utils/POST";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AuthOutMiddleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token-web-app")?.value;

  if (!token) return children;

  return POST("/auth/verify", { token })
    .then((data) => {
      if (!data) return children;
      return redirect("/");
    })
    .catch(() => {
      console.error("Error verifying token:");
      return children;
    });
}
