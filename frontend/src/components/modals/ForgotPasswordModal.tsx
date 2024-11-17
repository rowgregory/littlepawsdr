import Modal from '../common/Modal';

const ForgotPasswordModal = ({ modal, handleClose, error, data }: any) => {
  return (
    <Modal show={modal} onClose={handleClose}>
      <div className='bg-white rounded-xl p-8 w-full'>
        <i
          onClick={handleClose}
          className='fa-solid fa-xmark fa-sm text-gray-500 flex justify-end mb-4 cursor-pointer'
        ></i>
        {error && (
          <>
            <i className='fa-solid fa-circle-exclamation text-red-500 fa-2x flex justify-center mb-3'></i>
            <p className='text-red-500 text-sm font-Matter-Medium text-center mb-2'>
              {error?.data?.message}
            </p>
          </>
        )}
        {data?.message && (
          <>
            <i className='fa-solid fa-check text-green-500 fa-2x flex justify-center mb-3'></i>
            <p className='text-green-500 text-sm font-Matter-Medium text-center mb-2'>
              {data?.message}
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
