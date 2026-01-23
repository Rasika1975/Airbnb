import { createContext } from "react";

export const authDataContext = createContext(null);

function AuthContext({ children }) {
  const serverUrl = "https://airbnb-backend-aygr.onrender.com";

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
