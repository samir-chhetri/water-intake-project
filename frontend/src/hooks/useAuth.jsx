import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, loginUser, isLoggedIn, logoutUser } = useContext(AuthContext);

  return { user, loginUser, isLoggedIn, logoutUser };
};
