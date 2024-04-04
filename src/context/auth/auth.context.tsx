"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import authReducer from "./auth.reducer";

import { IUSER, ILIST } from "@/models/user";

const INITAIL_STATE = {
  username: "",
  name: "",
  list: [],
  isAuth: false,
  updateList(list: ILIST[]) {},
  logIn(data: IUSER) {},
  logOut() {},
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
        logIn: (data: IUSER) => {
          dispatch({ type: "LOG_IN", payload: data });
        },
        logOut: () => {
          dispatch({ type: "LOG_OUT" });
        },
        updateList: (list: IUSER[]) => {
          dispatch({ type: "UPDATE_LIST", payload: list });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
