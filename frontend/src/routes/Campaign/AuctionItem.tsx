import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/toolkitStore';
import { usePlaceBidMutation } from '../../redux/services/campaignApi';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import BidConfirmationModal from '../../components/modals/BidConfirmationModal';
import BidModal from '../../components/campaign/BidModal';
import BidHistoryItem from '../../components/campaign/BidHistoryItem';
import AuctionItemButtonBox from '../../components/campaign/AuctionItemButtonBox';
import AuctionItemShippingAddressModal from '../../components/modals/AuctionItemShippingAddressModal';

const useAuctionItemForm = (callback?: any, data?: any) => {
  const values = {
    bidAmount: 0,
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        bidAmount: data.minimumBid,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInput, onSubmit };
};

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
  const [mainPhoto, setMainPhoto] = useState(null);
  const ifCampaignIsOver = campaign?.campaign?.auction?.settings?.hasEnded;

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0)
    }
  }, [])

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

  const endDateModified = new Date(
    campaign?.campaign?.auction?.settings?.endDate
  ).toLocaleString('en-us', {
    timeZone: 'America/New_York',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  });

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

  const { inputs, handleInput, onSubmit } = useAuctionItemForm(
    handlePlaceBidCb,
    auctionItem
  );

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
        <div className='max-w-[1340px] mx-auto p-4 md:p-6'>
          <div className='flex items-center'>
            <Link
              to={`${pathname.split('item')[0].slice(0, -1)}`}
              className='flex items-center hover:no-underline'
            >
              <i
                className={`fa-solid fa-home ${campaign?.campaign.themeColor.text} mr-1.5`}
              ></i>
              <p className={`font-Matter-Regular ${campaign?.campaign.themeColor.text}`}>
                Auction
              </p>
            </Link>
            <i className='fa-solid fa-chevron-right fa-sm text-gray-300 mx-3'></i>
            <p className='font-Matter-Regular text-black'>{auctionItem?.name}</p>
          </div>
          <div className='grid grid-cols-12 gap-6 my-5'>
            <div className='col-span-12 h-fit lg:col-span-1 flex lg:flex-col order-2 lg:order-1 gap-3'>
              {auctionItem?.photos?.map((photo: any) => (
                <div
                  key={photo?._id}
                  className='p-2 flex fle items-center justify-center bg-white w-20 lg:w-full aspect-square rounded-lg mb-1'
                  onMouseOver={() => setMainPhoto(photo?.url)}
                >
                  <img src={photo?.url} alt='Little Paws Auction' />
                </div>
              ))}
            </div>
            <div className='col-span-12 lg:col-span-6 order-1 lg:order-2'>
              <div className='bg-white col-start-3 col-span-10 p-6 rounded-lg'>
                <img
                  src={mainPhoto ?? auctionItem?.photos[0]?.url}
                  className='object-contain w-full h-[340px]'
                  alt='Little Paws Auction'
                />
              </div>
            </div>
            <div className='col-span-12 lg:col-span-5 order-3'>
              <h1 className='font-Matter-Medium text-5xl tracking-wide mb-8'>
                {auctionItem?.name}
              </h1>
              {!ifCampaignIsOver && (
                <div className='flex items-center justify-between w-fit mb-5'>
                  {auctionItem?.sellingFormat === 'auction' && (
                    <Fragment>
                      <div className='flex flex-col'>
                        <p className='text-xs tracking-wider text-gray-500 font-Matter-Regular mb-2'>
                          CURRENT BID
                        </p>
                        <p className='tracking-wider text-gray-800 font-Matter-Regular'>
                          {`$${auctionItem?.currentBid}` ?? 'No Bids'}
                        </p>
                      </div>
                      <div className='flex flex-col h-fit mx-6 border-l-2 border-r-2 border-gray-200 px-4'>
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
                      <i className='fa-regular fa-clock'></i> {endDateModified}
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
              <div className='grid grid-cols-12 gap-4 items-center mb-3'>
                <p
                  className={`col-span-1 text-text-300 font-Matter-Medium h-5 w-5 rounded-full border-2 ${campaign?.campaign.themeColor?.border} flex items-center justify-center ${campaign?.campaign?.themeColor?.text} mr-2.5`}
                >
                  i
                </p>
                <p className='col-span-11 text-lg font-Matter-Medium'>Item Details</p>
              </div>
              <div className='bg-white w-full rounded-lg shadow-sm py-1 px-4 grid grid-cols-12 mb-5 p-4'>
                <div className='grid col-span-6 gap-2'>
                  <p className='font-Matter-Regular text-xs text-gray-400'>ITEM ID:</p>
                  {auctionItem?.isAuction && (
                    <Fragment>
                      <p className='font-Matter-Regular text-xs text-gray-400'>
                        STARTING PRICE:
                      </p>
                      <p className='font-Matter-Regular text-xs text-gray-400'>
                        BID INCREMENT:
                      </p>
                    </Fragment>
                  )}
                  <p className='font-Matter-Regular text-xs text-gray-400'>START DATE:</p>
                  <p className='font-Matter-Regular text-xs text-gray-400'>END DATE:</p>
                </div>
                <div className='grid col-span-6 gap-2'>
                  <p className='font-Matter-Medium text-xs'>{auctionItem?._id}</p>
                  {auctionItem?.isAuction && (
                    <Fragment>
                      <p className='font-Matter-Medium text-xs'>
                        ${auctionItem?.startingPrice}
                      </p>
                      <p className='font-Matter-Medium text-xs'>$1</p>
                    </Fragment>
                  )}
                  <p className='font-Matter-Medium text-xs'>
                    {formatDateWithTimezone(
                      campaign?.campaign?.auction?.settings?.startDate
                    )}
                  </p>
                  <p className='font-Matter-Medium text-xs '>
                    {formatDateWithTimezone(
                      campaign?.campaign?.auction?.settings?.endDate
                    )}
                  </p>
                </div>
              </div>
              {auctionItem?.sellingFormat === 'auction' && (
                <Fragment>
                  <div className='grid grid-cols-12 gap-4 items-center mb-3'>
                    <i
                      className={`col-span-1 fa-solid fa-chart-line fa-lg ${theme.text} mr-2`}
                    ></i>
                    <p className='col-span-11 text-lg font-Matter-Medium'>Bid History</p>
                  </div>
                  {+auctionItem?.bids?.length === 0 ? (
                    <div className='flex justify-center flex-col items-center py-4  border-dashed border-2 border-gray-300 rounded-lg w-full mt-4'>
                      <i
                        className={`fa-solid fa-chart-line fa-xl ${theme.text} h-5 mt-3 mb-0.5`}
                      ></i>
                      <p className='font-Matter-Regular'>No bids found</p>
                    </div>
                  ) : (
                    <div className='bg-white rounded-lg shadow-sm py-1 px-4'>
                      {auctionItem?.bids
                        ?.map((bid: any, i: number) => (
                          <BidHistoryItem key={bid?._id} bid={bid} i={i} theme={theme} />
                        ))
                        .reverse()}
                    </div>
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AuctionItem;
