import { Fragment } from 'react';
import Checkmark from '../svg/Checkmark';
import Modal from '../common/Modal';

const AccountSecurityModal = ({ modal, closeModal, auth }: any) => {
  return (
    <Modal show={modal.toggle} onClose={closeModal}>
      <div className='bg-white rounded-xl p-8 w-full'>
        <i
          onClick={closeModal}
          className='fa-solid fa-xmark fa-sm text-gray-500 flex justify-end mb-4 cursor-pointer'
        ></i>
        {modal.text === 'reset-success' ? (
          <div className='flex justify-center items-center flex-col'>
            <Checkmark />
            <p className='text-green-500 text-sm font-Matter-Medium text-center mt-2'>
              Password reset
            </p>
          </div>
        ) : (
          modal.text && (
            <Fragment>
              <i className='fa-solid fa-circle-exclamation text-red-500 fa-2x flex justify-center mb-3'></i>
              <p className='text-red-500 text-sm font-Matter-Medium text-center mb-2'>
                {modal.text}
              </p>
            </Fragment>
          )
        )}
        {modal.help && (
          <Fragment>
            <h3 className='font-Matter-Medium mb-4 text-lg'>Password requirements</h3>
            <div className='flex items-center'>
              <i
                className={`${
                  auth?.validations[0] === 1 ? 'fas fa-check' : ''
                } text-green-500 mr-2`}
              ></i>
              <p className='font-Matter-Regular text-gray-700'>must be at least 9 characters</p>
            </div>
            <div className='flex items-center'>
              <i
                className={`${
                  auth?.validations[1] === 1 ? 'fas fa-check' : ''
                } text-green-500 mr-2`}
              ></i>
              <p className='font-Matter-Regular text-gray-700'>must contain a capital letter</p>
            </div>
            <div className='flex items-center'>
              <i
                className={`${
                  auth?.validations[2] === 1 ? 'fas fa-check' : ''
                } text-green-500 mr-2`}
              ></i>
              <p className='font-Matter-Regular text-gray-700'>must contain a number</p>
            </div>
            <div className='flex items-center'>
              <i
                className={`${
                  auth?.validations[3] === 1 ? 'fas fa-check' : ''
                } text-green-500 mr-2`}
              ></i>
              <p className='font-Matter-Regular text-gray-700'>
                must contain one symbol ~`!-@#$%^ &*()_+={}|:;"',.?
              </p>
            </div>
          </Fragment>
        )}
      </div>
    </Modal>
  );
};

export default AccountSecurityModal;
