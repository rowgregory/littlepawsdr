import { Modal } from 'react-bootstrap';

const BidModal = ({
  openBidModal,
  handleClose,
  campaign,
  auctionItem,
  handlePlaceBid,
  inputs,
  handleInput,
  loading,
}: any) => {
  const theme = campaign.campaign.themeColor;
  const themeText = theme.text;
  const themeBorder = theme.border;
  const themeDarker = theme.darker;
  const themeDark = theme.dark;

  return (
    <Modal show={openBidModal} centered onHide={handleClose}>
      <div className='bg-white p-6 rounded-xl'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
            <i className={`fa-solid fa-arrow-up-from-bracket text-2xl ${themeText} mr-3`}></i>
            <p className='font-Matter-Medium text-2xl'>Place a bid</p>
          </div>
          <i onClick={handleClose} className='fa-solid fa-xmark cursor-pointer'></i>
        </div>
        <div className='grid grid-cols-2 grid-rows-2 gap-2 mb-10'>
          <div className='flex items-center'>
            <p className='w-5/12 font-Matter-Medium text-xs text-gray-400'>CURRENT BID</p>
            <div className='ml-2 w-7/12 h-[0.5px] bg-gray-400'></div>
          </div>
          <div className='flex items-center'>
            <p className='w-5/12 font-Matter-Medium text-xs text-gray-400'>MINIMUM BID</p>
            <div className='ml-2 w-7/12 h-[0.5px] bg-gray-400'></div>
          </div>

          <p className='text-xl font-Matter-SemiBold'>
            {auctionItem?.totalBids === 0 ? 'No Bids' : `$${auctionItem?.currentBid}`}
          </p>
          <p className='text-xl font-Matter-SemiBold'>
            {auctionItem?.minimumBid ? `$${auctionItem?.minimumBid}` : auctionItem?.startingPrice}
          </p>
        </div>
        <p className='text-lg font-Matter-SemiBold mb-2'>Enter your bid amount</p>
        <div className='border-[1px] border-slate-300 rounded-lg py-3 px-2.5 flex items-center mb-4'>
          <p className={`${themeText} mr-2.5 text-2xl font-Matter-SemiBold`}>$</p>
          <input
            type='number'
            name='bidAmount'
            min={auctionItem?.startingPrice}
            onChange={handleInput}
            placeholder={auctionItem?.minimumBid?.toString() ?? auctionItem?.startingPrice?.toString()}
            alt='Place your bid here'
            className={`font-Matter-Medium text-2xl ${themeText} focus:outline-none placeholder:text-gray-300 placeholder:font-Matter-Medium placeholder:text-2xl`}
            value={inputs.bidAmount || ""}
          />
        </div>
        <div className='flex gap-3'>
          <button
            className={`w-4/12 border-2 ${themeText} ${themeBorder} rounded-lg py-2.5 font-Matter-Medium text-xl cursor-pointer duration-300 hover:${themeBorder} hover:${themeText}`}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className={`w-8/12 text-white ${themeDarker} rounded-lg py-2.5 font-Matter-Medium text-xl cursor-pointer duration-300 hover:${themeDark} disabled:cursor-not-allowed disabled:bg-gray-300`}
            onClick={(e: any) => handlePlaceBid(e)}
            disabled={
              inputs.bidAmount === 0 ||
              inputs.bidAmount < auctionItem?.minimumBid ||
              inputs.bidAmount < auctionItem?.startingPrice
            }
          >{`Plac${loading ? 'ing' : 'e'} ${inputs.bidAmount >= auctionItem?.currentBid ? `$${inputs.bidAmount}` : ''
            } bid`}</button>
        </div>
      </div>
    </Modal>
  );
};

export default BidModal;
