import { createContext } from "react";

const AuthContext = createContext({
  userId: null,
  login: () => {},
  logout: () => {},
  isAuthentificated: false,
  username: ''
});

export default AuthContext;
