import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface UserInfoProps {
  userLogin: {
    userInfo: {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      isVolunteer: boolean;
      avatar: string;
      volunteerTitle: string;
      volunteerEmail: string;
      profileCardTheme: string;
      online: boolean;
      theme: string;
      token: string;
      confirmed: boolean;
      publicId: string;
    };
  };
}

const refreshAccessToken = async (id: any) => {
  try {
    // Make a request to the server to generate a new token
    const { data } = await axios.post('/api/users/refresh-token', { id });
    const { refreshToken } = data;

    return refreshToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

const PrivateRoute = ({ children }: any) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state: UserInfoProps) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const refreshToken = async () => {
      try {
        // Check if the access token has expired
        const expirationTime =
          JSON.parse(atob(userInfo?.token.split('.')[1])).exp * 1000;
        if (expirationTime <= Date.now()) {
          // Access token has expired, refresh it
          const newToken = await refreshAccessToken(userInfo._id);

          // Update the userInfo object in the Redux store with the new token
          const updatedUserInfo = { ...userInfo, token: newToken };

          localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        }
      } catch (error) {
        // Handle error refreshing token
        console.error('Error refreshing token:', error);
      }
    };

    refreshToken();
  }, [dispatch, userInfo]);

  return children;
};

export default PrivateRoute;
