import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import { useRefreshTokenMutation } from '../../redux/services/authApi';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }: any) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [getRefreshToken] = useRefreshTokenMutation()
  const navigate = useNavigate()

  useEffect(() => {
    const runRefreshToken = () => {
      if (!user?.isAdmin) return navigate('/')

      try {
        const decoded = user?.token && JSON.parse(atob(user.token.split('.')[1])).exp;
        if (Date.now() < decoded.exp * 1000) {

          getRefreshToken({ id: user?._id });
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    };

    runRefreshToken();
  }, [user, getRefreshToken, navigate]);

  return children;
};

export default PrivateRoute;
