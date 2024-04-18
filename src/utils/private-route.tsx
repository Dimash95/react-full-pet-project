import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const useAuth = () => {
  // Предположим, что функция проверяет наличие токена доступа в localStorage
  // или как-то иначе определяет, авторизован ли пользователь.
  const token = localStorage.getItem("access_token");
  return token != null;
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useAuth(); // ваша функция проверки авторизации

  if (!isAuthenticated) {
    // Перенаправление на страницу входа, сохраняя путь, куда хотел попасть пользователь
    return <Navigate to="/react-full-pet-project/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
