import { createContext, useContext, useReducer } from "react";
import authReducer from "./auth.reducer";

const INITAIL_STATE = {
  username: "",
  name: "",
  token: "",
  isAuth: false,
  logIn: () => {},
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
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
