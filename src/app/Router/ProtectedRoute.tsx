import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '@store/store';

interface ProtectedRouteProps {
  roles?: string[];  // Роли, которые имеют доступ к маршруту
}

const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Если указаны роли и роль пользователя не соответствует, перенаправляем на главную страницу
  if (roles && !roles.includes(user?.role || '')) {
    return <Navigate to="/" replace />;
  }

  // Если всё в порядке, отображаем дочерние элементы
  return <Outlet />;
};

export default ProtectedRoute;