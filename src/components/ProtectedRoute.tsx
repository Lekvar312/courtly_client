import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ProtectedRouteProps {
  role?: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  if (user?.role === role) {
    return <>{children}</>;
  } else {
    navigate("/not-found");
  }
};

export default ProtectedRoute;
