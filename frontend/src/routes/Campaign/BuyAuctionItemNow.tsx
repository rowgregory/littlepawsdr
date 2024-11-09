import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { RootState } from '../../redux/toolkitStore';
import {
  useCreateInstantBuyMutation,
  useGetAuctionItemQuery,
} from '../../redux/services/campaignApi';
import { Fragment, useState } from 'react';
import toFixed from '../../utils/toFixed';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BuyAuctionItemNow = () => {
  const params = useParams();
  const [orderLoader, setOrderLoader] = useState(false);
  const state = useSelector((state: RootState) => state);
  const auctionItemId = params.auctionItemId;
  const campaign = state.campaign;
  const theme = campaign.campaign.themeColor;
  const customCampaignLink = params?.customLinkId;

  const { data, isLoading } = useGetAuctionItemQuery({
    auctionItemId,
    customCampaignLink,
  });
  const auctionItem = data?.auctionItem;

  const [createInstantBuy, { data: instantBuy }] = useCreateInstantBuyMutation();

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceReRender: [auctionItem],
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: Number(toFixed(auctionItem?.total)),
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
        const instantBuyObj = {
          auction: auctionItem?.auction,
          auctionItem: auctionItem,
          payPalId: details?.id,
          buyNowPrice: auctionItem?.buyNowPrice,
          totalPrice: auctionItem?.total,
        };

        await createInstantBuy(instantBuyObj)
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
      <Modal show={instantBuy !== undefined} centered>
        <div className='bg-white p-6 rounded-xl'>
          <div className='flex flex-col justify-center items-center'>
            <i
              className={`fa-solid fa-check ${theme.text} ${theme.border} rounded-full flex items-center justify-center h-8 w-8 border-[2px] mb-3`}
            ></i>
            <p className='text-4xl font-Matter-Medium mb-4'>Thank you!</p>
            <p className='text-gray-500 text-center'>
              A confirmation of your payment has been <br />
              sent to your email.
            </p>
            <Link
              to='/settings/campaign/instant-buys'
              className={`text-[#fff] ${theme?.dark} font-Matter-Medium px-4 py-2.5 rounded-lg mt-4 hover:text-[#fff] hover:no-underline`}
            >
              See my instant buys
            </Link>
          </div>
        </div>
      </Modal>
      <div className='flex justify-between flex-col md:flex-row md:min-h-screen'>
        <div
          className={`flex md:fixed flex-col justify-between h-full md:w-[327px] md:min-h-screen p-[12px] md:px-6 md:py-8 ${theme?.dark} `}
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
            {auctionItem?.totalQuantity <= 0 ? (
              <div className='flex flex-col'>
                <p className='font-Matter-Medium mb-2'>This item has sold out</p>
                <Link
                  to={`/campaigns/${customCampaignLink}/auction`}
                  className={`${theme?.dark} text-[#fff] font-Matter-Medium px-4 py-2.5 rounded-lg flex justify-center cursor-pointer duration-200 hover:shadow-lg hover:text-[#fff] hover:no-underline`}
                >
                  Go to auction
                </Link>
              </div>
            ) : !state?.auth?.user?._id ? (
              <div className='flex flex-col'>
                <p className='font-Matter-Medium mb-2'>
                  Please sign in to proceed with this purchase
                </p>
                <Link
                  to='/auth/login'
                  className={`${theme?.dark} text-[#fff] font-Matter-Medium px-4 py-2.5 rounded-lg flex justify-center cursor-pointer duration-200 hover:shadow-lg hover:text-[#fff] hover:no-underline`}
                >
                  Sign in
                </Link>
              </div>
            ) : (
              <div className='w-full max-w-lg flex flex-col'>
                {!instantBuy && (
                  <Fragment>
                    <div className='bg-white rounded-xl w-full mt-3.5 lg:mt-0 mb-4'>
                      <p className='font-Matter-Regular'>Items summary</p>
                      <div className='flex items-center justify-between my-3'>
                        <figure className='flex items-center'>
                          <img
                            src={auctionItem?.photos[0]?.url}
                            className='w-16 h-16 rounded-lg object-cover'
                            alt='Little Paws Dachshund Rescue Auction'
                          />
                          <figcaption className='ml-4 font-Matter-Medium'>
                            {auctionItem?.name}
                          </figcaption>
                        </figure>
                        <p className='font-Matter-Medium'>${toFixed(auctionItem?.buyNowPrice)}</p>
                      </div>
                      <div className='flex items-center justify-between mb-3'>
                        <p className='font-Matter-Regular'>Shipping Fee</p>
                        <p className='font-Matter-Regular'>
                          ${toFixed(auctionItem?.shippingCosts)}
                        </p>
                      </div>
                      <div className='w-full h-[0.5px] bg-gray-100 mb-4'></div>
                      <div className='flex items-center justify-between mt-3.5'>
                        <p className='font-Matter-Regular'>Total</p>
                        <p className='font-Matter-Medium'>${toFixed(auctionItem?.total)}</p>
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
                  </Fragment>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BuyAuctionItemNow;
