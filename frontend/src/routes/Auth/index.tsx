import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import EmailConfirmation from './EmailConfirmation';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import ResetPasswordSuccess from './ResetPasswordSuccess';
import AuctionRegister from './AuctionRegister';

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />{' '}
      <Route path='/email-confirmation/:token/:userId/:customCampaignLink' element={<EmailConfirmation />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='/reset-password/success' element={<ResetPasswordSuccess />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/auction/register' element={<AuctionRegister />} />
      {/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
    </Routes>
  );
};

export default AuthRoutes;
