import { FC } from 'react';
import { dateFnFormatDistanceToNow } from '../../utils/date-fns-helpers';

type AuctionItemTimerRibbonProps = {
  item: any;
  theme: any;
  hasEnded: boolean;
  hasBegun: boolean;
  campaign: any;
};

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
        } ${!hasEnded ? 'text-gray-700' : 'text-[#fff]'} mr-2`}
      ></i>
      <p className={`${!hasEnded ? 'text-gray-700' : 'text-[#fff]'}  font-Matter-Medium`}>
        {!hasBegun
          ? `Starts in ${dateFnFormatDistanceToNow(campaign?.auction?.settings?.startDate)}`
          : !hasEnded
          ? `Ends ${dateFnFormatDistanceToNow('2024-09-29T21:00:00.000Z')}`
          : item.status}
      </p>
    </div>
  );
};

export default AuctionItemTimerRibbon;
