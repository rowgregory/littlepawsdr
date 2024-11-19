import { Link } from 'react-router-dom';
import Modal from '../common/Modal';

const AuctionItemShippingAddressModal = ({
  open,
  setOpenAddressModal,
  auctionItemId,
  theme,
  customLinkId,
}: any) => {
  return (
    <Modal show={open} onClose={() => setOpenAddressModal({ open: false, auctionItemId: '' })}>
      <div className='bg-white p-8 rounded-xl flex flex-col justify-center items-center'>
        <i
          className={`fa-solid fa-truck-fast ${theme?.text} fa-xl transform rounded-md h-12 w-12 ${theme?.xlight} flex items-center justify-center p-2`}
        ></i>
        <p className='text-2xl text-center mt-2 mb-4 font-Matter-SemiBold'>
          You need to provide your shipping address before proceeding
        </p>
        <Link
          to='/settings/campaign/settings'
          state={{ cameFromInstantBuy: true, auctionItemId, customLinkId }}
          onClick={() => setOpenAddressModal({ open: false, auctionItemId: '' })}
          className={`font-Matter-Medium text-xl text-[#fff] ${theme?.dark} rounded-lg px-4 py-2 duration-300 hover:${theme?.darker} hover:text-[#fff] hover:${theme?.darker} hover:no-underline`}
        >
          Add shipping address
        </Link>
      </div>
    </Modal>
  );
};

export default AuctionItemShippingAddressModal;
