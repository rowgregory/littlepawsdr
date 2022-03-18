import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
  exact?: boolean;
  path: string;
  component: FC;
}

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

const Private: FC<PrivateRouteProps> = ({
  exact,
  path,
  component: Component,
}) => {
  const userLogin = useSelector((state: UserInfoProps) => state.userLogin);
  const { userInfo } = userLogin;
  const auth = userInfo?.isAdmin;
  return (
    <Route
      exact={exact ?? false}
      path={path}
      render={({ location }) =>
        auth ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default Private;
