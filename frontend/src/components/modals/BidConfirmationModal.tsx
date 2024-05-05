import { Modal } from 'react-bootstrap';

const BidConfirmationModal = ({
  openConfirmationModal,
  handleCloseConfirmationModal,
  theme,
  campaign,
  setOpenConfirmationModal,
}: any) => {
  return (
    <Modal show={openConfirmationModal} centered onHide={handleCloseConfirmationModal}>
      <div className='bg-white p-8 rounded-xl flex flex-col justify-center items-center'>
        <i
          className={`fa-solid fa-right-to-bracket ${theme.text} fa-xl transform rotate-[270deg] rounded-md h-12 w-12 ${theme.xlight} flex items-center justify-center p-2`}
        ></i>
        <p className={`text-6xl font-Matter-Medium ${theme.text} my-4`}>
          ${campaign?.confirmedBidAmount ?? 0}
        </p>
        <p className='text-3xl font-Matter-SemiBold mb-2'>Your bid is confirmed</p>
        <p className='text-lg font-Matter-Regular mb-4'>
          You can find all of your bids under profile
        </p>
        <button
          onClick={() => setOpenConfirmationModal(false)}
          className={`font-Matter-Medium text-xl text-white ${theme.dark} rounded-[8px] px-4 py-2 duration-300 hover:${theme.darker}`}
        >
          Back to Auction
        </button>
      </div>
    </Modal>
  );
};

export default BidConfirmationModal;
