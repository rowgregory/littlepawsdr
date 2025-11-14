import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/toolkitStore';

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated at all, redirect to login
    if (isAuthenticated === false) {
      navigate('/login');
      return;
    }

    // If authenticated but not admin, redirect to home
    if (isAuthenticated === true && user && !user.isAdmin) {
      navigate('/');
    }
  }, [user, isAuthenticated, navigate]);

  // Show loading while checking authentication
  if (isAuthenticated === undefined || isAuthenticated === null) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <h1 className='font-Matter-Medium text-gray-700'>Verifying admin access...</h1>
        </div>
      </div>
    );
  }

  // Not authenticated - don't render anything (useEffect will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated but not admin - don't render anything (useEffect will redirect)
  if (!user?.isAdmin) {
    return null;
  }

  // Authenticated and admin - render children
  return <>{children}</>;
};

export default RequireAdmin;
