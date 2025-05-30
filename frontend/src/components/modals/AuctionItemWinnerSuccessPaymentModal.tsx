import { Link } from 'react-router-dom';
import Modal from '../common/Modal';

const AuctionItemWinnerSuccessPaymentModal = ({
  campaign,
  winningBid,
}: {
  campaign: any;
  winningBid: any;
}) => {
  return (
    <Modal show={campaign?.success} onClose={() => {}}>
      <div className='bg-white p-6 rounded-xl'>
        <div className='flex flex-col justify-center items-center'>
          <i className='fa-solid fa-check text-green-500 rounded-full flex items-center justify-center h-8 w-8 border-[2px] border-green-500 mb-3'></i>
          <p className='text-4xl font-Matter-Medium mb-4'>Thank you!</p>
          <p className='text-gray-500 text-center'>
            A confirmation of your payment has been <br />
            sent to your email.
          </p>
          <Link
            to='/settings/campaign/winning-bids'
            className={`text-[#fff] ${winningBid?.theme?.dark} font-Matter-Medium px-4 py-2.5 rounded-lg mt-4 hover:text-[#fff] hover:no-underline`}
          >
            See my winning bids
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default AuctionItemWinnerSuccessPaymentModal;
