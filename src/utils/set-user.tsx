"use client";

import { useAuth } from "@/context/auth/auth.context";
import { useEffect } from "react";

export default function SetUser({
  children,
  data,
}: {
  children: React.ReactNode;
  data: any;
}) {
  const { logIn, isAuth } = useAuth();

  useEffect(() => {
    console.log(data);
    if (data && !isAuth) {
      logIn(data);
    }
  }, []);

  return children;
}
