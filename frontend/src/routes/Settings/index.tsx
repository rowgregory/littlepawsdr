import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Profile';
import Security from './Security';
import SideBar from '../../components/settings/SideBar';
import { SettingsLayoutWithSideBar } from '../../components/settings/SettingsLayoutWithSideBar';

const SettingsRoutes: FC = () => {
  return (
    <SettingsLayoutWithSideBar sideBar={<SideBar />}>
      <Routes>
        <Route path='profile' element={<Profile />} />
        <Route path='security' element={<Security />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </SettingsLayoutWithSideBar>
  );
};

export default SettingsRoutes;
