import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/toolkitStore';

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, dataReady } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataReady && !user?.isAdmin) {
      navigate('/');
    }
  }, [user, navigate, dataReady]);

  if (!dataReady) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <h1 className='font-Matter-Medium'>Verifying admin access...</h1>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default RequireAdmin;
