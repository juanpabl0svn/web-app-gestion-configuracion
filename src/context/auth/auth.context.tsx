"use client";
import { createContext, useContext, useReducer } from "react";
import authReducer from "./auth.reducer";

import { IUSER } from "@/models/user";

const INITAIL_STATE = {
  username: "",
  name: "",
  isAuth: false,
  logIn: (user: IUSER) => {},
};

const AuthContext = createContext(INITAIL_STATE);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(authReducer, INITAIL_STATE);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logIn(user: IUSER) {
          return dispatch({ type: "LOG_IN", payload: user });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
