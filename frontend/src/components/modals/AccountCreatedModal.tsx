import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccountCreatedModalProps } from '../../types/auth-types';

const AccountCreatedModal: FC<AccountCreatedModalProps> = ({ accountCreated, closeModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <Modal show={accountCreated} onHide={closeModal} centered>
      <div className='bg-white rounded-xl p-8 w-full'>
        <i
          onClick={closeModal}
          className='fa-solid fa-xmark fa-sm text-gray-500 flex justify-end mb-4 cursor-pointer'
        ></i>
        {accountCreated && (
          <div className='flex flex-col justify-center items-center'>
            <i className='fa-solid fa-envelope-circle-check text-teal-500 fa-2x flex justify-center'></i>
            <p className='font-Matter-Medium text-xl text-center mb-3 mt-2'>Email confirmed!</p>
            <p className='font-Matter-Regular text-center'>
              Your account has been successfully created. Welcome to your profile, where you can
              access all your purchases and manage your account details.
            </p>
            <button
              onClick={() => {
                navigate(location.pathname, { state: null });
                closeModal();
              }}
              className='mt-5 px-4 py-2 rounded-lg bg-teal-400 text-[#fff] font-matter-Medium text-lg duration-200 hover:bg-teal-500 hover:shadow-xl'
            >
              Lets go see
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AccountCreatedModal;
