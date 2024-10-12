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
import AuctionItemWinnerSuccessPaymentModal from '../components/modals/AuctionItemWinnerSuccessPaymentModal';
import AuctionItemWinnerLeftPanel from '../components/campaign/AuctionItemWinnerLeftPanel';
import capitalizeName from '../utils/capitalizeName';

const AuctionItemWinner = () => {
  const [orderLoader, setOrderLoader] = useState(false);
  const params = useParams();
  const campaign = useSelector((state: RootState) => state.campaign);
  const [payforAuctionItem] = useUpdateAuctionWinningBidderMutation();
  const { isLoading } = useGetWinningBidderQuery(params?.id);
  const winningBid = campaign.winner;
  const customCampaignLink = winningBid?.customCampaignLink;

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

  return (
    <Fragment>
      {(orderLoader || isLoading) && <GreenRotatingTransparentCircle />}
      <AuctionItemWinnerSuccessPaymentModal campaign={campaign} winningBid={winningBid} />
      <div className='flex justify-between flex-col md:flex-row md:min-h-screen'>
        <AuctionItemWinnerLeftPanel
          winningBid={winningBid}
          customCampaignLink={customCampaignLink}
        />
        <div className='flex w-full md:w-[calc((100vw-327px))] justify-center md:justify-start md:ml-[327px] md:min-h-screen p-[12px] md:p-6 lg:p-8'>
          <div className='w-full max-w-sm flex flex-col'>
            <h1 className='text-4xl text-center font-bold'>
              {capitalizeName(campaign?.winner?.user?.name)},
            </h1>
            <h4 className={`text-xl font-bold text-center mb-5 ${campaign?.winner?.theme?.text}`}>
              You're the Winner!
            </h4>
            <h6 className='text-center mb-10'>Please Complete Your Payment</h6>
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
