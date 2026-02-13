import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#7B1F7B] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
