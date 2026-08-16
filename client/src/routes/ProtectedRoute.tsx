import { Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import type { Role } from '../types';
import { useAppSelector } from '../store';
import { roleHome } from '../config/navigation';

export function ProtectedRoute({ allow }: { allow: Role[] }) {
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!allow.includes(user.role)) {
    return <Navigate to={roleHome[user.role]} replace />;
  }

  return <Outlet />;
}

export function GuestRoute() {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');

  if (isAuthenticated && user) {
    if (role && role !== user.role) return <Outlet />;
    return <Navigate to={roleHome[user.role]} replace />;
  }

  return <Outlet />;
}
