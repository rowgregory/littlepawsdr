import formatCurrency from '../../utils/formatCurrency';

const AuctionDonationCard = ({ donation, theme }: { donation: any; theme: any }) => {
  return (
    <div className='border-[0.5px] border-gray-200 p-3.5 rounded-sm flex flex-col mb-4 animate-fadeIn'>
      <div className='grid grid-cols-9 gap-1 mb-2 items-center'>
        <p
          className={`col-span-2 md:col-span-12 lg:col-span-2 ${theme?.light} ${theme?.text} ${
            donation?.oneTimeDonationAmount > 1000 ? 'text-xs' : 'text-sm'
          } h-12 w-12 rounded-full flex items-center justify-center font-Matter-Medium`}
        >
          {formatCurrency(donation?.oneTimeDonationAmount)}
        </p>
        <p className='col-span-7 md:col-span-12 lg:col-span-7 font-Matter-Light'>
          <span className='font-Matter-Medium'>{donation?.donor}</span> made a{' '}
          <span className='font-Matter-Medium'>${donation?.oneTimeDonationAmount}</span> donation
        </p>
      </div>
      <p className='font-Matter-Regular mt-2'>{donation?.donorPublicMessage}</p>
    </div>
  );
};

export default AuctionDonationCard;
