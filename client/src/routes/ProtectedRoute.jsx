import { Navigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

function ProtectedRoute({ children }) {
  const token = useAuthStore(
    (state) => state.token
  );

  /*
  =================================
  No Token
  =================================
  */

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;