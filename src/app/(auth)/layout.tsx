import AuthMiddleware from "@/middleware/auth.middleware";

export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthMiddleware>{children}</AuthMiddleware>;
}
