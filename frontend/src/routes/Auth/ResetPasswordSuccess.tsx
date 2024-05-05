import { Link } from 'react-router-dom';

const ResetPasswordSuccess = () => {
  return (
    <div className='bg-white min-h-screen flex items-center justify-center p-8'>
      <div className='max-w-md w-full'>
        <div className='flex flex-col items-center justify-center shadow-lg rounded-3xl py-5 px-3.5'>
          <i className='fa-solid fa-check text-4xl text-teal-500'></i>
          <p className='font-Matter-Medium text-2xl text-center mt-2 mb-4'>Password successfully updated</p>
          <Link
            to='/auth/login'
            className='text-center text-white bg-teal-500 px-5 py-1.5 rounded-md duration-300 hover:no-underline hover:bg-teal-600'
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordSuccess