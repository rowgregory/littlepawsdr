import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DonationConfirmationModal = ({
  openModal,
  handleClose,
  user,
}: any) => {
  const navigate = useNavigate();
  const [userNeedsToCreateAccount, setUserNeedsToCreateAccount] = useState(false);

  return (
    <Modal show={openModal} centered onHide={handleClose}>
      <div className='bg-white p-8 rounded-xl flex flex-col justify-center items-center'>
        <i
          onClick={handleClose}
          className='cursor-pointer absolute top-5 right-5 fas fa-times fa-lg text-gray-600'
        ></i>
        <i
          className={`fa-solid fa-heart text-[#9863a8] fa-2xl rounded-md h-16 w-16 bg-[#e5c9ee] flex items-center justify-center p-2 shadow-md`}
        ></i>
        <p className='text-xl font-Matter-Medium my-4 text-center'>
          {userNeedsToCreateAccount ? 'To access your donation history, you must first have an active registered account' : 'Thank you for supporting Little Paws Dachshund Rescue'}
        </p>
        <button
          onClick={() => {
            if (user?._id) {
              navigate(`/settings/digital-goods-and-merch/donations`);
            } else if (!userNeedsToCreateAccount) {
              setUserNeedsToCreateAccount(true)
            } else {
              navigate(`/auth/register`)
            }
          }}
          className={`text-[#fff] bg-[#9863a8] rounded-lg px-4 py-2.5 font-Matter-Medium duration-400 shadow-lg`}
        >
          {userNeedsToCreateAccount ? 'Sign up' : 'See my donations'}
        </button>
      </div>
    </Modal>
  );
};

export default DonationConfirmationModal;