import { useNavigate } from 'react-router-dom';
import AuctionDetails from './action-item-card-body/AuctionDetails';
import AuctionButton from './action-item-card-body/AuctionBtn';
import AuctionSoldOutOrEnded from './action-item-card-body/AuctionSoldOrEnded';
import ViewDetailsLink from './action-item-card-body/ViewDetailsLink';
import { FC } from 'react';
import { AuctionItemCardBodyProps } from '../../types/campaign-types';

const AuctionItemCardBody: FC<AuctionItemCardBodyProps> = ({
  item,
  hasEnded,
  hasBegun,
  auth,
  pathname,
  theme,
  setOpenShippingAddressModal,
  status,
}) => {
  const navigate = useNavigate();
  const userLoggedIn = !!auth?.user?._id;
  const auctionActive = hasBegun && !hasEnded;

  const handleButtonClick = () => {
    if (item.isFixed && !auth?.user?.shippingAddress) {
      setOpenShippingAddressModal({ open: true, auctionItemId: item._id });
    } else {
      navigate(`${pathname}/item/${item?._id}/${item?.isFixed ? 'buy' : 'bid'}`);
    }
  };

  return (
    <div className='pt-6 px-3 pb-3 flex flex-col justify-between h-48 rounded-br-lg rounded-bl-lg'>
      <div className='flex flex-col'>
        <p className='font-Matter-Medium text-lg'>{item?.name}</p>
        {item.isAuction && auctionActive && <AuctionDetails item={item} />}
      </div>
      {userLoggedIn ? (
        auctionActive ? (
          <AuctionButton item={item} handleButtonClick={handleButtonClick} theme={theme} />
        ) : (
          <AuctionSoldOutOrEnded
            item={item}
            theme={theme}
            hasEnded={hasEnded}
            status={status}
            pathname={pathname}
          />
        )
      ) : (
        <ViewDetailsLink pathname={pathname} item={item} theme={theme} />
      )}
    </div>
  );
};

export default AuctionItemCardBody;
