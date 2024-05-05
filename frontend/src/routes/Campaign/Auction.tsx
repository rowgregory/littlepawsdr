import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import AuctionItemCard from '../../components/campaign/AuctionItemCard';
import { Fragment } from 'react';
import { formatDateWithTimezone } from '../../utils/dateFunctions';

const Auction = () => {
  const state = useSelector((state: RootState) => state);
  const auth = state.auth;
  const campaign = state.campaign.campaign
  const auction = state?.campaign?.campaign?.auction;
  const settings = auction?.settings;
  const items = auction?.items;
  const hasBegun = settings?.hasBegun;
  const theme = state.campaign.campaign?.themeColor;

  return (
    <Fragment>
      <div className='bg-gray-100 min-h-[calc(100vh-66px)] '>
        <div className='max-w-[1340px] w-full mx-auto p-6 md:p-8'>
          <div className='flex flex-col md:flex-row'>
            <div className='sm:w-full md:w-8/12'>
              <p className='font-Matter-Medium text-4xl mb-2 h-10'>{campaign?.title}</p>
              <div className='flex items-center mb-4 md:mb-0'>
                <p
                  className={`font-Matter-Light text-xs flex items-center ${theme?.light} rounded-lg p-2`}
                >
                  <span>
                    <i
                      className={`mr-1.5 flex items-center justify-center fa-solid fa-check ${theme?.darker} h-4 w-4 text-white rounded-full text-xs`}
                    ></i>
                  </span>
                  Verified
                </p>
                <p className='mx-1'>By</p>
                <span>
                  <Link
                    to='/campaigns'
                    className={`${theme?.text} font-Matter-Medium hover:${theme?.text}`}
                  >
                    Little Paws Dachshund Rescue
                  </Link>
                </span>
                <i
                  className={`fa-solid fa-arrow-right text-white text-xs ${theme?.darker} h-5 w-5 rounded-full ml-1 flex items-center justify-center `}
                ></i>
              </div>
            </div>
            <div className='sm:w-full md:w-4/12'>
              {!settings?.hasEnded && (
                <div className='bg-white py-[12px] px-3 rounded-xl h-fit mb-3.5'>
                  <p className='text-gray-400 font-Matter-Regular'>
                    {settings?.auctionStatus}
                  </p>
                  <p className='text-xl font-Matter-Medium mt-1'>
                    {formatDateWithTimezone(
                      !hasBegun ? settings?.startDate : settings?.endDate
                    )}
                  </p>
                </div>
              )}
              {!auth?.user && (
                <Link
                  to='/auth/register'
                  state={{
                    cameFromAuction: true,
                    customCampaignLink: campaign?.customCampaignLink,
                  }}
                  className='hover:no-underline'
                >
                  <p
                    className={`${theme?.darker} text-white font-Matter-Medium text-2xl rounded-xl py-3.5 w-full text-center h-fit duration-300`}
                  >
                    Register to Bid
                  </p>
                </Link>
              )}
            </div>
          </div>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-20'>
            {items?.map((item: any) => (
              <AuctionItemCard
                key={item?._id}
                item={item}
                auth={auth}
                campaign={campaign}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auction;
