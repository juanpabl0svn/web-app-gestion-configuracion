import AuthOutMiddleware from "@/middleware/auth-out.middleware";

export default function LayoutAuth({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return <AuthOutMiddleware>{children}</AuthOutMiddleware>;
}
