import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/toolkitStore';
import { usePlaceBidMutation } from '../../redux/services/campaignApi';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import BidConfirmationModal from '../../components/modals/BidConfirmationModal';
import BidModal from '../../components/campaign/BidModal';
import AuctionItemButtonBox from '../../components/campaign/AuctionItemButtonBox';
import AuctionItemShippingAddressModal from '../../components/modals/AuctionItemShippingAddressModal';
import useAuctionItemFormPublic from '../../utils/hooks/useAuctionItemFormPublic';
import AuctionItemImgAndDescSection from '../Admin/Campaigns/Auction/AuctionItemImgAndDescSection';
import useScrollToTop from '../../utils/hooks/useScrollToTop';
import AuctionItemDetailsSection from '../../components/campaign/AuctionItemDetailsSection';
import AuctionItemBidHistory from '../../components/campaign/AuctionItemBidHistory';

const AuctionItem = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const state = useSelector((state: RootState) => state);
  const campaign = state.campaign;
  const auth = state.auth;
  const customLinkId = params.customLinkId;
  const readyToBid = params.bid;
  const auctionItemId = params.auctionItemId;
  const [openBidModal, setOpenBidModal] = useState(readyToBid === 'bid');
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState({ open: false, auctionItemId: '' });
  const theme = campaign.campaign.themeColor;

  const ifCampaignIsOver = campaign?.campaign?.auction?.settings?.hasEnded;

  const handleCloseBidModal = () => {
    setOpenBidModal(false);
  };
  const handleCloseConfirmationModal = () => {
    setOpenConfirmationModal(false);
  };

  const auctionItem = campaign?.campaign?.auction?.items?.find(
    (item: any) => item?._id === auctionItemId
  ) as any;

  const [placeBid, { isLoading: loadingPlacingBid }] = usePlaceBidMutation();

  const handlePlaceBidCb = async () => {
    await placeBid({
      auctionItemId: auctionItem?._id,
      auctionId: campaign?.campaign?.auction?._id,
      bidAmount: inputs.bidAmount,
    })
      .unwrap()
      .then(() => {
        handleCloseBidModal();
        setOpenConfirmationModal(true);
      })
      .catch((err: any) => err);
  };

  const { inputs, handleInput, onSubmit } = useAuctionItemFormPublic(handlePlaceBidCb, auctionItem);

  useScrollToTop();

  return (
    <Fragment>
      <BidConfirmationModal
        openConfirmationModal={openConfirmationModal}
        handleCloseConfirmationModal={handleCloseConfirmationModal}
        theme={theme}
        campaign={campaign}
        setOpenConfirmationModal={setOpenConfirmationModal}
      />
      <BidModal
        openBidModal={openBidModal}
        handleClose={handleCloseBidModal}
        campaign={campaign}
        auctionItem={auctionItem}
        handlePlaceBid={onSubmit}
        inputs={inputs}
        handleInput={handleInput}
        loading={loadingPlacingBid}
      />
      <AuctionItemShippingAddressModal
        open={openAddressModal.open}
        setOpenAddressModal={setOpenAddressModal}
        auctionItemId={auctionItemId}
        theme={theme}
        customLinkId={customLinkId}
      />
      <div className='bg-gray-100 min-h-[calc(100vh-66px)] h-full'>
        <div className='max-w-[1340px] mx-auto px-2.5 py-4 md:p-6'>
          <div className='flex items-center'>
            <Link
              to={`${pathname.split('item')[0].slice(0, -1)}`}
              className='flex items-center hover:no-underline'
            >
              <i className={`fa-solid fa-home ${campaign?.campaign.themeColor.text} mr-1.5`}></i>
              <p className={`font-Matter-Regular ${campaign?.campaign.themeColor.text}`}>Auction</p>
            </Link>
            <i className='fa-solid fa-chevron-right fa-sm text-gray-300 mx-3'></i>
            <p className='font-Matter-Regular text-black'>{auctionItem?.name}</p>
          </div>
          <div className='grid grid-cols-12 gap-6 mt-3 mb-5'>
            <AuctionItemImgAndDescSection auctionItem={auctionItem} />
            <div className='col-span-12 lg:col-span-5 order-3'>
              <h1 className='font-Matter-Medium text-3xl lg:text-5xl tracking-wide mb-8'>
                {auctionItem?.name}
              </h1>
              {!ifCampaignIsOver && (
                <div className='flex flex-col lg:flex-row lg:items-center gap-y-3 lg:gap-y-0 justify-between w-fit mb-5'>
                  {auctionItem?.sellingFormat === 'auction' && (
                    <Fragment>
                      <div className='flex flex-col'>
                        <p className='text-xs tracking-wider text-gray-500 font-Matter-Regular mb-2'>
                          {auctionItem?.bids?.length === 0 ? 'OPENING' : 'CURRENT'} BID
                        </p>
                        <p className='tracking-wider text-gray-800 font-Matter-Regular'>
                          {`$${auctionItem?.currentBid}` ?? 'No Bids'}
                        </p>
                      </div>
                      <div className='flex flex-col h-fit lg:mx-6 lg:border-l-2 lg:border-r-2 lg:border-gray-200 lg:px-4'>
                        <p className='text-xs tracking-wider text-gray-500 font-Matter-Regular mb-2'>
                          TOTAL BIDS
                        </p>
                        <div className='flex items-center w-fit'>
                          <i className='fa-regular fa-user fa-sm mr-2'></i>
                          <p className='tracking-wider text-gray-800 font-Matter-Regular'>
                            {auctionItem?.totalBids}
                          </p>
                        </div>
                      </div>
                    </Fragment>
                  )}
                  <div className='flex flex-col'>
                    <p className='text-xs tracking-wider text-gray-500 font-Matter-Regular mb-2'>
                      ENDS ON
                    </p>
                    <p className='text-sm tracking-wider text-gray-800 font-Matter-Regular'>
                      <i className='fa-regular fa-clock'></i>{' '}
                      {formatDateWithTimezone(campaign?.campaign?.auction?.settings?.endDate)}
                    </p>
                  </div>
                </div>
              )}
              <AuctionItemButtonBox
                ifCampaignIsOver={ifCampaignIsOver}
                auctionItem={auctionItem}
                campaign={campaign}
                theme={theme}
                auth={auth}
                params={params}
                setOpenBidModal={setOpenBidModal}
                setOpenAddressModal={setOpenAddressModal}
              />
              <AuctionItemDetailsSection campaign={campaign} auctionItem={auctionItem} />
              <AuctionItemBidHistory auctionItem={auctionItem} theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AuctionItem;
