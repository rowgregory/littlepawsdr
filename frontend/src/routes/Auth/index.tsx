import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import ResetPasswordSuccess from './ResetPasswordSuccess';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} /> <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='/reset-password/success' element={<ResetPasswordSuccess />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default AuthRoutes;
