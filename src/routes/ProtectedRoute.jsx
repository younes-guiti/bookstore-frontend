
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const { user } = useAuthContext();


  if (!token) {
    return <Navigate to="/login" replace />;
  }


  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;