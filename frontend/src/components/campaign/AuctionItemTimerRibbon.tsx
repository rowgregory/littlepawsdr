import { FC } from 'react';
import { dateFnFormatDistanceToNow } from '../../utils/date-fns-helpers';
import { AuctionItemTimerRibbonProps } from '../types/campaign-types';

const AuctionItemTimerRibbon: FC<AuctionItemTimerRibbonProps> = ({
  item,
  theme,
  hasEnded,
  hasBegun,
  campaign,
}) => {
  return (
    <div
      className={`absolute shadow-md right-0 top-[152px] md:top-40 ${
        item.status === 'Ended'
          ? 'bg-gray-400'
          : item.status === 'Sold'
          ? theme?.dark
          : theme?.xlight
      } h-10 w-fit px-2 rounded-tl-md rounded-bl-md flex items-center justify-center`}
    >
      <i
        className={`fa-solid ${
          hasEnded ? 'fa-solid fa-gavel' : hasBegun ? 'fa-hourglass' : 'fa-solid fa-clock'
        } ${!hasEnded ? theme.text : 'text-[#fff]'} mr-2`}
      ></i>
      <p className={`${!hasEnded ? 'text-gray-700' : 'text-[#fff]'}  font-Matter-Medium`}>
        {campaign?.auction?.settings?.status === 'UPCOMING'
          ? `Starts ${dateFnFormatDistanceToNow(campaign?.auction?.settings?.startDate)}`
          : campaign?.auction?.settings?.status === 'LIVE'
          ? `Ends ${dateFnFormatDistanceToNow(campaign?.auction?.settings?.endDate)}`
          : `Ended ${dateFnFormatDistanceToNow(campaign?.auction?.settings?.endDate)}`}
      </p>
    </div>
  );
};

export default AuctionItemTimerRibbon;
