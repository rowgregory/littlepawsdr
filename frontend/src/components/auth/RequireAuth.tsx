import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/toolkitStore';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, dataReady } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataReady && !user) {
      navigate('/');
    }
  }, [user, navigate, dataReady]);

  if (!dataReady) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <h1 className='font-Matter-Medium'>Verifying access...</h1>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;
