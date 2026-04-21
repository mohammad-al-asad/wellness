import { Navigate } from "react-router-dom";
import { getStoredRole, isLeaderOnlyRole } from "../lib/auth";

const LeaderOnlyRoute = ({ children }) => {
  if (!isLeaderOnlyRole(getStoredRole())) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default LeaderOnlyRoute;
