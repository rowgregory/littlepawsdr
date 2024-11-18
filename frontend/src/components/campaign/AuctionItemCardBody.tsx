import { FC, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuctionDetails from './action-item-card-body/AuctionDetails';
import AuctionButton from './action-item-card-body/AuctionBtn';
import AuctionSoldOutOrEnded from './action-item-card-body/AuctionSoldOrEnded';
import ViewDetailsLink from './action-item-card-body/ViewDetailsLink';
import { AuctionItemCardBodyProps } from '../../types/campaign-types';
import AuctionRegisterModal from '../modals/AuctionRegisterModal';

const AuctionItemCardBody: FC<AuctionItemCardBodyProps> = ({
  item,
  hasEnded,
  auth,
  pathname,
  theme,
  setOpenShippingAddressModal,
  status,
  customLinkId,
}) => {
  const navigate = useNavigate();
  const auctionActive = status === 'Active Campaign';
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const handleButtonClick = () => {
    if (!auth?.user?._id) {
      setOpenRegisterModal(true);
    } else {
      if (!auth?.user?.hasShippingAddress) {
        setOpenShippingAddressModal({ open: true, auctionItemId: item._id });
      } else {
        navigate(`${pathname}/item/${item?._id}/${item?.isFixed ? 'buy' : 'bid'}`);
      }
    }
  };

  return (
    <Fragment>
      <AuctionRegisterModal
        open={openRegisterModal}
        handleClose={() => setOpenRegisterModal(false)}
        theme={theme}
        customCampaignLink={customLinkId}
      />
      <div className='pt-6 px-3 pb-3 flex flex-col justify-between h-48 rounded-br-lg rounded-bl-lg'>
        <div className='flex flex-col'>
          <p className='font-Matter-Medium text-lg'>{item?.name}</p>
          {item.isAuction && auctionActive && <AuctionDetails item={item} />}
          {item.isFixed && auctionActive && (
            <p className='text-xs text-gray-400 font-Matter-Regular'>
              Items Remaining: {item.totalQuantity}
            </p>
          )}
        </div>
        {status === 'Pre-Campaign' && (
          <ViewDetailsLink pathname={pathname} item={item} theme={theme} />
        )}
        {auctionActive && (
          <AuctionButton item={item} handleButtonClick={handleButtonClick} theme={theme} />
        )}
        {status === 'Post-Campaign' && (
          <AuctionSoldOutOrEnded
            item={item}
            theme={theme}
            hasEnded={hasEnded}
            status={status}
            pathname={pathname}
          />
        )}
      </div>
    </Fragment>
  );
};

export default AuctionItemCardBody;
