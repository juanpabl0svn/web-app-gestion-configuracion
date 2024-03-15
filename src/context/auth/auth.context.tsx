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
};

const AuthContext = createContext(INITAIL_STATE);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: any;
}) {
  const [state, dispatch] = useReducer(authReducer, INITAIL_STATE);

  useEffect(() => {
    if (data && state.isAuth === false) {
      dispatch({ type: "LOG_IN", payload: data });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        updateList: (list: IUSER[]) => {
          dispatch({ type: "UPDATE_LIST", payload: list });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
