import { Link } from 'react-router-dom';
import { useForgotPasswordEmailMutation } from '../../redux/services/authApi';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { createFormActions } from '../../redux/features/form/formSlice';
import validateForgotPasswordForm from '../../validations/validateForgotPasswordForm';
import { Heart, User, Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { AuthInput } from '../../components/ui/AuthInput';
import { useState } from 'react';

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { forgotPasswordForm } = useAppSelector((state: RootState) => state.form);
  const { handleInput, setErrors } = createFormActions('forgotPasswordForm', dispatch);
  const [forgotPassword, { isLoading }] = useForgotPasswordEmailMutation();
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isValid = validateForgotPasswordForm(forgotPasswordForm?.inputs, setErrors);
    if (!isValid) return;

    try {
      const response = await forgotPassword({ email: forgotPasswordForm?.inputs?.email.toLowerCase() }).unwrap();

      if (response?.message) {
        setMessage(response.message);
        setIsSuccess(true);
      }
    } catch {}
  };

  const resetForm = () => {
    setIsSuccess(false);
    setMessage('');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full'>
        <Link to='/'>
          <div className='bg-gradient-to-r from-amber-400 to-orange-400 p-8 text-center'>
            <div className='bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg'>
              <span className='text-4xl'>🐾</span>
            </div>
            <h1 className='text-2xl font-bold text-white mb-2'>Little Paws Dachshund Rescue</h1>
            <div className='flex justify-center gap-1 mt-3'>
              {[...Array(5)].map((_, i) => (
                <Heart key={i} className='w-4 h-4 text-white fill-current animate-pulse' style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        </Link>
        <div className='p-8'>
          {!isSuccess ? (
            <>
              <div className='text-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>Forgot Your Password?</h2>
                <p className='text-gray-600 text-sm'>Enter your email and we&apos;ll send you a link to reset your password.</p>
              </div>
              <form onSubmit={handleSubmit} className='flex flex-col w-full space-y-4'>
                <AuthInput
                  label='Email address *'
                  icon={<User className='w-4 h-4 text-amber-500' />}
                  name='email'
                  value={forgotPasswordForm?.inputs?.email || ''}
                  onChange={handleInput}
                  error={forgotPasswordForm?.errors?.email}
                  placeholder='Enter email'
                />
                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold py-4 px-6 rounded-xl hover:from-amber-500 hover:to-orange-500 focus:outline-none focus:ring-4 focus:ring-amber-300 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                >
                  {isLoading ? (
                    <div className='flex items-center justify-center gap-2'>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      Sending Reset Link...
                    </div>
                  ) : (
                    <div className='flex items-center justify-center gap-2'>
                      <Heart className='w-5 h-5' />
                      Send Password Reset Email
                    </div>
                  )}
                </button>
              </form>
              <div className='mt-6 text-center'>
                <p className='text-sm text-gray-600'>
                  Return to{' '}
                  <Link to='/auth/login' className='text-amber-600 hover:text-amber-700 font-medium'>
                    Login
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <div className='text-center animate-fade-in'>
              {/* Success Icon with Animation */}
              <div className='relative mb-6'>
                <div className='bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-24 h-24 mx-auto flex items-center justify-center shadow-lg animate-bounce'>
                  <CheckCircle className='w-12 h-12 text-white' />
                </div>
                <div className='absolute -top-2 -right-2 bg-amber-400 rounded-full w-8 h-8 flex items-center justify-center animate-pulse'>
                  <Mail className='w-4 h-4 text-white' />
                </div>
              </div>

              {/* Success Message */}
              <h2 className='text-2xl font-bold text-gray-800 mb-3'>Check Your Email!</h2>
              <div className='bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-6'>
                <p className='text-green-800 font-medium mb-2'>Reset link sent successfully! 🎉</p>
                <p className='text-green-700 text-sm leading-relaxed'>
                  {message ||
                    "We've sent a password reset link to your email address. Please check your inbox (and spam folder) and follow the instructions to reset your password."}
                </p>
              </div>

              {/* Email sent to display */}
              {forgotPasswordForm?.inputs?.email && (
                <div className='bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6'>
                  <div className='flex items-center justify-center gap-2 text-amber-800'>
                    <Mail className='w-4 h-4' />
                    <span className='text-sm font-medium'>Email sent to:</span>
                  </div>
                  <p className='text-amber-900 font-semibold mt-1'>{forgotPasswordForm.inputs.email}</p>
                </div>
              )}

              {/* Helpful Tips */}
              <div className='bg-gray-50 rounded-xl p-5 mb-6'>
                <h3 className='font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2'>
                  <span className='text-amber-500'>💡</span>
                  Helpful Tips
                </h3>
                <ul className='text-sm text-gray-600 space-y-2 text-left'>
                  <li className='flex items-start gap-2'>
                    <span className='text-amber-500 mt-0.5'>•</span>
                    <span>The reset link will expire in 30 minutes for security</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-amber-500 mt-0.5'>•</span>
                    <span>Check your spam or junk folder if you don't see the email</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-amber-500 mt-0.5'>•</span>
                    <span>Make sure to use a strong, unique password</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className='space-y-3'>
                <button
                  onClick={resetForm}
                  className='w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold py-3 px-6 rounded-xl hover:from-amber-500 hover:to-orange-500 focus:outline-none focus:ring-4 focus:ring-amber-300 transform hover:scale-105 transition-all duration-200'
                >
                  <div className='flex items-center justify-center gap-2'>
                    <Mail className='w-4 h-4' />
                    Send Another Reset Email
                  </div>
                </button>

                <Link
                  to='/auth/login'
                  className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl focus:outline-none focus:ring-4 focus:ring-gray-300 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2'
                >
                  <ArrowLeft className='w-4 h-4' />
                  Back to Login
                </Link>
              </div>

              {/* Support Contact */}
              <div className='mt-6 pt-4 border-t border-gray-200'>
                <p className='text-xs text-gray-500 mb-2'>Still having trouble?</p>
                <a
                  href='mailto:lpdr@littlepawsdr.org'
                  className='text-amber-600 hover:text-amber-700 font-medium text-sm hover:underline transition-colors inline-block'
                >
                  Contact Support Team
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
