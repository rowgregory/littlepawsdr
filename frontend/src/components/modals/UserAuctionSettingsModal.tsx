import { Modal } from 'react-bootstrap';

const UserAuctionSettingsModal = ({
  modal,
  closeModal,
  navigate,
  customCampaignLink,
}: any) => {
  return (
    <Modal show={modal.open || modal.open2} onHide={closeModal} centered>
      <div className='bg-white rounded-xl p-8 w-full'>
        <i
          onClick={closeModal}
          className='fa-solid fa-xmark fa-sm text-gray-500 flex justify-end mb-4 cursor-pointer'
        ></i>
        {modal.text && (
          <div className='flex items-center justify-start flex-col'>
            <i className='fa-solid fa-circle-check text-green-600 fa-3x flex justify-center mb-3'></i>
            <p className='font-Matter-Medium text-center text-lg text-green-600 mb-2'>
              {modal.open2 ? 'Address added' : 'Email confirmed'}
            </p>
            <p className='font-Matter-Regular text-center mb-4 max-w-72 w-full'>
              {modal.text}
            </p>
            <button
              className='duration-200 px-4 py-1.5 rounded-sm w-fit bg-gray-200 mx-auto hover:bg-gray-300'
              onClick={() => {
                closeModal();
                if (modal.open2) {
                  navigate(`/campaigns/${customCampaignLink}/auction`);
                }
              }}
            >
              {modal.open2 ? 'Go to auction' : 'Enter Address'}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UserAuctionSettingsModal;
