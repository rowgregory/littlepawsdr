import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/toolkitStore';
import {
  useGetWinningBidderQuery,
  useUpdateAuctionWinningBidderMutation,
} from '../redux/services/campaignApi';
import GreenRotatingTransparentCircle from '../components/Loaders/GreenRotatingTransparentCircle';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import toFixed from '../utils/toFixed';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Modal } from 'react-bootstrap';

const AuctionItemWinner = () => {
  const params = useParams();
  const [orderLoader, setOrderLoader] = useState(false);
  const campaign = useSelector((state: RootState) => state.campaign);
  const customCampaignLink = campaign?.campaign?.customCampaignLink;

  const [payforAuctionItem] = useUpdateAuctionWinningBidderMutation();

  const { data, isLoading } = useGetWinningBidderQuery(params?.id);
  const winningBid = data?.winningBidder;
  const auctionItemId = winningBid?.auctionItem?._id;

  const payPalComponents = {
    style: { layout: 'vertical' },
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: Number(toFixed(winningBid?.totalPrice)),
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      });
    },
    onApprove: (data: any, actions: any) => {
      setOrderLoader(true);
      return actions.order.capture().then(async (details: any) => {
        const winningBidder = {
          id: winningBid?._id,
          payPalId: details?.id,
        };
        await payforAuctionItem(winningBidder)
          .unwrap()
          .then(() => {
            setOrderLoader(false);
          })
          .catch(() => {
            setOrderLoader(false);
          });
      });
    },
  } as any;

  if (isLoading) return <GreenRotatingTransparentCircle />;

  return (
    <Fragment>
      {orderLoader && <GreenRotatingTransparentCircle />}
      <Modal show={campaign?.success} centered>
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
      <div className='flex justify-between flex-col md:flex-row md:min-h-screen'>
        <div
          className={`flex md:fixed flex-col justify-between h-full md:w-[327px] md:min-h-screen p-[12px] md:px-6 md:py-8 ${winningBid?.theme?.dark} `}
        >
          <div>
            <Link
              to={`/campaigns/${customCampaignLink}/auction/item/${auctionItemId}`}
              className='flex items-center cursor-pointer hover:no-underline hover:text-[#fff]'
            >
              <i className='fa-solid fa-arrow-left text-gray-100 mr-2.5'></i>
              <p className='font-Matter-Regular text-gray-100 text-xs md:text-sm'>
                Back to auction
              </p>
            </Link>
            <p className='font-Matter-Medium text-white text-xl mt-1.5 md:mt-10'>
              Little Paws Dachshund Rescue
            </p>
          </div>
          <p className='text-white font-Matter-Medium'>Powered by Gregory Row</p>
        </div>
        <div className='flex w-full md:w-[calc((100vw-327px))] justify-center md:justify-start md:ml-[327px] md:min-h-screen p-[12px] md:p-6 lg:p-8'>
          <div className='w-full max-w-sm flex flex-col'>
            {winningBid?.auctionItemPaymentStatus === 'Paid' ? (
              <div className='text-center flex justify-center items-center flex-col'>
                <i
                  className={`fa-solid fa-handshake-angle ${winningBid?.theme?.text} fa-xl rounded-md h-12 w-12 ${winningBid?.theme?.light} flex items-center justify-center p-2 mb-3`}
                ></i>
                <p className='font-Matter-Regular text-xl mb-3'>
                  This item has already been paid for
                </p>
                <Link
                  className={`${winningBid?.theme?.dark} px-4 py-2 rounded-lg text-[#fff] font-Matter-Medium hover:no-underline hover:text-[#fff] hover:shadow-lg`}
                  to='/campaigns'
                >
                  Go to campaigns
                </Link>
              </div>
            ) : (
              winningBid?.auctionItemPaymentStatus === 'Pending' &&
              !campaign?.success && (
                <div className='flex flex-col md:mt-5'>
                  <div className='bg-white rounded-xl w-full mt-3.5 lg:mt-0 mb-4'>
                    <div className='flex flex-col'>
                      <div className='flex items-center justify-between my-3'>
                        <figure className='flex items-center'>
                          <img
                            src={winningBid?.auctionItem?.photos[0]?.url}
                            className='w-16 h-16 rounded-lg object-cover'
                            alt='Little Paws Dachshund Rescue Auction'
                          />
                          <figcaption className='ml-4 font-Matter-Medium'>
                            {winningBid?.auctionItem?.name}
                          </figcaption>
                        </figure>
                        <p className='font-Matter-Regular'>${toFixed(winningBid?.itemSoldPrice)}</p>
                      </div>
                      <div className='w-full h-[0.5px] bg-gray-100 mb-4'></div>
                      <div className='flex items-center justify-between mb-3'>
                        <p className='font-Matter-Regular'>Shipping Fee</p>
                        <p className='font-Matter-Regular'>${toFixed(winningBid?.shipping)}</p>
                      </div>
                      <div className='flex items-center justify-between mb-3'>
                        <p className='font-Matter-Regular'>Processing Fee</p>
                        <p className='font-Matter-Regular'>${toFixed(winningBid?.processingFee)}</p>
                      </div>
                      <div className='flex items-center justify-between mt-3.5'>
                        <p className='font-Matter-Medium'>Total</p>
                        <p className='font-Matter-Medium'>${toFixed(winningBid?.totalPrice)}</p>
                      </div>
                    </div>
                  </div>
                  <div className='bg-white rounded-xl w-full px-6 md:p-0 mt-10'>
                    <PayPalButtons
                      style={payPalComponents.style}
                      forceReRender={payPalComponents.forceRerender}
                      createOrder={payPalComponents.createOrder}
                      onApprove={payPalComponents.onApprove}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AuctionItemWinner;
