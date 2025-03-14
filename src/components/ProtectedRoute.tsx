import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getCurrentUserService } from "../services/AuthServices"; // імпортуємо сервіс

interface ProtectedRouteProps {
  role?: string
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const { user, loading: loadingRedux } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true); // для локального стану завантаження
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (!user && !loadingRedux) {
      // Якщо користувач ще не завантажений
      getCurrentUserService()
        .then((data) => {
          setCurrentUser(data); // Зберігаємо користувача в локальний стейт
          setLoading(false); // Завантаження завершено
        })
        .catch((error) => {
          console.error("Не вдалося отримати користувача", error);
          setLoading(false); // Завантаження завершено навіть з помилкою
        });
    } else if (user) {
      setCurrentUser(user); // Якщо користувач вже є в Redux
      setLoading(false);
    }
  }, [user, loadingRedux]);

  if (loading) return <div>Перевірка доступу...</div>;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
