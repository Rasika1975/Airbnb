import { createContext } from "react";

export const authDataContext = createContext(null);

function AuthContext({ children }) {
  const serverUrl = "http://localhost:8000";

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
