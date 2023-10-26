import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Profile from './Profile';
import Security from './Security';
import SideBar from '../../components/settings/SideBar';
import { SettingsLayoutWithSideBar } from '../../components/settings/SettingsLayoutWithSideBar';

const SettingsRoutes: FC = () => {
  const { path } = useRouteMatch();
  return (
    <SettingsLayoutWithSideBar sideBar={<SideBar />}>
      <Switch>
        <Route path={`${path}/profile`} component={Profile} />
        <Route path={`${path}/security`} component={Security} />
      </Switch>
    </SettingsLayoutWithSideBar>
  );
};

export default SettingsRoutes;
