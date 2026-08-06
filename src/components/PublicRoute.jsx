import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        Loading Admin...
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

export default PublicRoute;
