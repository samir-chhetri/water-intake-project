import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUser(user);
    }
  }, []);

  const isLoggedIn = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
