import { createContext } from "react";

const AuthContext = createContext({
  user: { username: "Guest" },
});

export default AuthContext;