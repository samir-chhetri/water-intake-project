import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedAuthRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn()) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedAuthRoute;
