import { FC, Fragment, useEffect, useRef } from 'react';
import { Bar } from '../styles/campaign-styles';

type GoalAndStorySectionProps = {
  campaign: any;
  theme: any;
  openModal: any;
};

const GoalAndStorySection: FC<GoalAndStorySectionProps> = ({ campaign, theme, openModal }) => {
  const prevWidthRef = useRef<number>(0);

  const progressPercentage =
    campaign?.totalCampaignRevenue && campaign?.goal
      ? (campaign.totalCampaignRevenue / campaign.goal) * 100
      : 0;

  useEffect(() => {
    prevWidthRef.current = progressPercentage;
  }, [progressPercentage]);

  useEffect(() => {
    if (openModal.donate) {
      window.scrollTo(0, window.innerHeight);
    }
  }, [openModal.donate]);

  return (
    <Fragment>
      <div className='flex justify-between items-baseline'>
        <p className='font-Matter-Medium text-4xl'>
          {!campaign?.isMoneyRaisedVisible && `$${Math.round(campaign?.totalCampaignRevenue)}`}{' '}
          <span className='font-Matter-Regular'>
            {campaign?.supporters} supporter{campaign?.supporters !== 1 && 's'}
          </span>
        </p>
        <p className='font-Matter-Regular'>
          {progressPercentage > 100 ? '100' : Math.round(progressPercentage)}% of
          {!campaign?.isMoneyRaisedVisible && `${campaign?.goal}`} goal
        </p>
      </div>
      <div className='relative h-6 bg-gray-200 rounded-2xl overflow-hidden'>
        <Bar
          width={Number(progressPercentage)}
          prevWidth={Number(prevWidthRef.current)}
          className={`${theme?.gradient}`}
        />
      </div>
      <p className='text-2xl font-Matter-Medium mt-4 mb-2.5'>Story</p>
      <p className='font-Matter-Light text-sm'>{campaign?.story}</p>
    </Fragment>
  );
};

export default GoalAndStorySection;
