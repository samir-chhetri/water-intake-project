import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn()) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedAuthRoute;
