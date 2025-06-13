import { Link } from 'react-router-dom';

const ResetPasswordSuccess = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full text-center p-8'>
        <div className='bg-green-100 text-green-700 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-lg mb-4'>
          <i className='fa-solid fa-check text-3xl'></i>
        </div>
        <h1 className='text-2xl font-bold mb-2'>Password Reset Successful</h1>
        <p className='text-sm text-gray-600 mb-6'>You can now log in with your new password.</p>
        <Link to='/auth/login' className='text-white bg-green-500 hover:bg-green-600 transition-colors font-bold py-3 px-6 rounded-xl inline-block'>
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;
