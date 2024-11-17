import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TransparentPurpleLogo } from '../assets';
import { Fragment, useState } from 'react';
import AuctionItemShippingAddressModal from '../modals/AuctionItemShippingAddressModal';
import AuctionItemTimerRibbon from './AuctionItemTimerRibbon';
import AuctionItemCardBody from './AuctionItemCardBody';

const AuctionItemCard = ({ item, auth, campaign }: any) => {
  const { pathname } = useLocation();
  const { customLinkId } = useParams();
  const navigate = useNavigate();
  const [openShippingAddressModal, setOpenShippingAddressModal] = useState({
    open: false,
    auctionItemId: '',
  });
  const hasBegun = campaign?.auction?.settings?.hasBegun;
  const hasEnded = campaign?.auction?.settings?.hasEnded;
  const theme = campaign?.themeColor;

  return (
    <Fragment>
      <AuctionItemShippingAddressModal
        open={openShippingAddressModal.open}
        setOpenAddressModal={setOpenShippingAddressModal}
        auctionItemId={openShippingAddressModal.auctionItemId}
        theme={theme}
        customLinkId={customLinkId}
      />
      <div
        key={item?._id}
        className='bg-white h-92 shadow-sm rounded-2xl relative hover:no-underline fade-in'
      >
        <img
          onClick={() => navigate(`${pathname}/item/${item?._id}`)}
          src={item?.photos[0]?.url ?? TransparentPurpleLogo}
          className='w-full h-44 object-cover rounded-tl-2xl rounded-tr-2xl cursor-pointer md:object-cover'
          alt='Little Paws Auction Item'
        />
        <AuctionItemTimerRibbon
          item={item}
          theme={theme}
          hasEnded={hasEnded}
          hasBegun={hasBegun}
          campaign={campaign}
        />
        <AuctionItemCardBody
          item={item}
          hasEnded={hasEnded}
          hasBegun={hasBegun}
          auth={auth}
          pathname={pathname}
          theme={theme}
          setOpenShippingAddressModal={setOpenShippingAddressModal}
          status={campaign?.auction?.settings?.status}
        />
      </div>
    </Fragment>
  );
};

export default AuctionItemCard;
