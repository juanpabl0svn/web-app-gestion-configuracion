import AuthMiddleware from "@/middleware/auth.middleware";
import { Toaster } from "react-hot-toast";

export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthMiddleware>
      <Toaster />
      {children}
    </AuthMiddleware>
  );
}
