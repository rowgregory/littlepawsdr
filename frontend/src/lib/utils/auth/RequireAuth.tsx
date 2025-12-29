import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserSelector } from '../../../redux/toolkitStore';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user } = useUserSelector();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return <>{children}</>;
};

export default RequireAuth;
