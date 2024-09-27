import { Fragment } from 'react';

const CampaignOverviewHero = ({ campaign, theme }: { campaign: any; theme: any }) => {
  return (
    <Fragment>
      <p className='font-Matter-Medium text-3xl lg:text-4xl mb-1.5 text-center lg:text-left'>
        {campaign?.title}
      </p>
      <p className='font-Matter-Light text-[15px] mb-4'>{campaign?.subtitle}</p>
      <div className='max-w-[840px] w-full max-h-[320px] h-full'>
        <img
          src={campaign?.coverPhoto}
          className={`w-full h-80 bg-gray-100 ${campaign?.imgPreference}`}
          alt='Campaign cover'
        />
      </div>
      <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between mt-3'>
        <p className='font-Matter-Light text-xs mb-3 lg:mb-0'>
          Organized by Little Paws Dachshund Rescue
        </p>
        <p className={`font-Matter-Light text-xs flex items-center ${theme?.light} rounded-lg p-2`}>
          <span>
            <i
              className={`mr-1.5 flex items-center justify-center fa-solid fa-check ${theme?.darker} h-4 w-4 text-white rounded-full text-xs`}
            ></i>
          </span>
          Verified
        </p>
      </div>
    </Fragment>
  );
};

export default CampaignOverviewHero;
