import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUpdateAccountToConfirmedMutation } from '../../redux/services/authApi';
import { useEffect, useState } from 'react';

const EmailConfirmation = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true)
  const { token, userId, customCampaignLink } = useParams() as any;
  const [updateUserToConfirmed, { isLoading }] = useUpdateAccountToConfirmedMutation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cameFromAuction = searchParams.get('cameFromAuction');

  useEffect(() => {
    if (token && userId) {
      updateUserToConfirmed({ token, userId })
        .unwrap()
        .then((data: any) => {
          if (cameFromAuction === 'true' && data?.user?.confirmed) {
            navigate(`/settings/campaign/settings`, { state: { cameFromAuction, customCampaignLink } });
          } else if (data?.user?.confirmed) {
            navigate(`/settings/profile`, { state: { accountWasJustCreated: true } });
          } else {
            setText(data?.message);
          }
        })
        .catch((err: any) => {
          setLoading(false)
          setText(err?.data?.message);
        });
    }
  }, [token, userId, cameFromAuction, updateUserToConfirmed, navigate, customCampaignLink]);

  if (isLoading || loading) return <></>

  return (
    <div className='bg-gray-50 flex items-center justify-center p-8 min-h-screen'>
      <div className='max-w-md w-full'>
        <div className='flex flex-col items-center justify-center shadow-lg rounded-3xl py-5 px-3.5'>
          <i className='fa-solid fa-circle-exclamation text-red-500 fa-4x flex justify-center mb-3'></i>
          <p className='text-red-500 text-lg font-Matter-Medium text-center mb-2'>{text}</p>
          <p className='text-sm text-gray-400 font-Matter-Light text-center mb-3.5'>
            Please log in again to continue accessing our services
          </p>
          <Link
            to='/auth/register'
            className='text-white text-sm bg-red-500 rounded-md py-1.5 px-8 font-Matter-Regular duration-300 hover:no-underline hover:bg-red-600'
          >
            Try again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
