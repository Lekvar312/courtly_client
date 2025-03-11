import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../store/userSlice";
import { AppDispatch, RootState } from "../store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;  
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser());
    }
  }, [token, user, dispatch]);

  if (!token || (user && user.role !== role)) return <Navigate to="/login" replace />;
  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default ProtectedRoute;
