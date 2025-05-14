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
    return (
      <section className="h-full w-full flex items-center justify-center">
        <h1 className="text-5xl text-sky-600 p-5 text-center font-bold">У вас не достатньо прав :(</h1>
      </section>
    );
  }
};

export default ProtectedRoute;
