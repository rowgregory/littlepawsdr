import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import AuctionItemCard from '../../components/campaign/AuctionItemCard';
import { Fragment, useState } from 'react';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import VerifiedBadge from '../Admin/Campaigns/Auction/VerifiedBadge';
import useScrollToTop from '../../utils/hooks/useScrollToTop';
import AuctionRegisterModal from '../../components/modals/AuctionRegisterModal';

const Auction = () => {
  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false);
  const auth = useSelector((state: RootState) => state.auth);
  let { campaign } = useSelector((state: RootState) => state.campaign);
  const theme = campaign?.themeColor;
  const auction = campaign?.auction;
  const items = auction?.items;
  const settings = auction?.settings;
  const hasBegun = settings?.hasBegun;

  useScrollToTop();

  return (
    <Fragment>
      <AuctionRegisterModal
        open={modal}
        handleClose={handleClose}
        theme={theme}
        customCampaignLink={campaign?.customCampaignLink}
      />
      <div className='bg-gray-100 min-h-[calc(100vh-66px)]'>
        <div className='max-w-[1340px] w-full mx-auto px-2.5 py-4 sm:p-6 md:p-8'>
          <div className='flex flex-col md:flex-row'>
            <div className='flex flex-col sm:w-full md:w-8/12'>
              <p className='font-Matter-Medium self-center sm:self-start text-3xl sm:text-4xl mb-2 h-10'>
                {campaign?.title}
              </p>
              <div className='flex items-center mb-4 md:mb-0'>
                <VerifiedBadge theme={theme} />
                <p className='text-sm'>
                  By
                  <span>
                    <Link
                      to='/campaigns'
                      className={`${theme?.text} ml-0.5 text-sm font-Matter-Medium hover:${theme?.text}`}
                    >
                      Little Paws Dachshund Rescue
                    </Link>
                  </span>
                </p>
                <div
                  className={`hidden sm:flex h-5 w-5 rounded-full ml-1 items-center justify-center ${theme?.darker} `}
                >
                  <i className='fa-solid fa-arrow-right text-white text-xs'></i>
                </div>
              </div>
            </div>
            <div className='sm:w-full md:w-4/12'>
              <div className='bg-white py-[12px] px-3 rounded-xl h-fit flex flex-col'>
                {!settings?.hasEnded && (
                  <Fragment>
                    <p className='text-gray-400 font-Matter-Regular'>{settings?.auctionStatus}</p>
                    <p className='text-xl font-Matter-Medium mt-1'>
                      {formatDateWithTimezone(!hasBegun ? settings?.startDate : settings?.endDate)}
                    </p>
                  </Fragment>
                )}
              </div>
              {!auth?.user && (
                <button onClick={() => setModal(true)} className='hover:no-underline w-full'>
                  <p
                    className={`${theme?.darker} text-white font-Matter-Medium text-2xl rounded-xl py-3.5 mt-4 w-full text-center h-fit duration-300`}
                  >
                    Register to Bid
                  </p>
                </button>
              )}
            </div>
          </div>
          <div className='grid gap-y-10 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-16'>
            {items?.map((item: any) => (
              <AuctionItemCard key={item?._id} item={item} auth={auth} campaign={campaign} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auction;
