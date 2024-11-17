import Modal from '../common/Modal';

const ResetPasswordModal = ({ modal, handleClose, message }: any) => {
  return (
    <Modal show={modal.open} onClose={handleClose}>
      <div className='bg-white rounded-xl p-8 w-full'>
        <i
          onClick={handleClose}
          className='fa-solid fa-xmark fa-sm text-gray-500 flex justify-end mb-4 cursor-pointer'
        ></i>
        {message && <p className='text-red-500 font-Matter-Medium'>{message}</p>}
        {modal.help && (
          <>
            <p className='font-Matter-Regular text-gray-700'>must contain a capital letter</p>
            <p className='font-Matter-Regular text-gray-700'>must contain a number</p>
            <p className='font-Matter-Regular text-gray-700'>
              must contain one symbol ~`!-@#$%^ &*()_+={}|:;"',.?
            </p>
            <p className='font-Matter-Regular text-gray-700'>must be at least 9 characters</p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
