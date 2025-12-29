import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthSelector, useUserSelector } from '../../../redux/toolkitStore';

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { user } = useUserSelector();
  const { isAuthenticated } = useAuthSelector();
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, redirect to home
    if (isAuthenticated === false) {
      navigate('/', { replace: true });
      return;
    }

    // If authenticated but not admin, redirect to supporter overview
    if (isAuthenticated === true && user && !user.isAdmin) {
      navigate('/supporter/overview', { replace: true });
      return;
    }
  }, [isAuthenticated, user, navigate]);

  // Show loading while checking authentication
  if (isAuthenticated === undefined || isAuthenticated === null) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-700 font-semibold'>Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (isAuthenticated === false) {
    return null; // Will be redirected by useEffect
  }

  // Authenticated but not admin
  if (!user?.isAdmin) {
    return null; // Will be redirected by useEffect
  }

  // Authenticated and admin - render children
  return <>{children}</>;
};

export default RequireAdmin;
