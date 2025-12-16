import { RootState, useAppSelector } from '../../../redux/toolkitStore';
import TailwindSpinner from '../../Loaders/TailwindSpinner';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import navbarLinksData from '../../../utils/campaign-utils/navbarLinkData';
import { Eye, ExternalLink, Copy, CheckCircle, Calendar, ArrowLeft } from 'lucide-react';

const NavLinkSection = ({ id, pathname }: { id: string; pathname: string }) => {
  const navLinks = navbarLinksData(id);

  return (
    <div className='bg-white border border-gray-200 rounded-2xl p-2 w-full shadow-lg'>
      <div className='flex flex-wrap gap-1'>
        {navLinks.map((obj: any, i: number) => {
          const isActive = obj.linkKey === pathname || pathname.includes(obj.key);
          return (
            <Link
              className={`relative group px-4 py-2.5 rounded-xl font-Matter-Medium text-sm transition-all duration-300 hover:no-underline flex-shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-white hover:text-teal-600 hover:shadow-md hover:scale-102'
              }`}
              to={obj.linkKey}
              key={i}
            >
              {/* Active glow effect */}
              {isActive && <div className='absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-400 rounded-xl blur opacity-30 -z-10'></div>}

              {/* Hover shimmer effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-700 ${
                  isActive ? 'hidden' : ''
                }`}
              ></div>

              {obj.title ?? ' '}

              {/* Active indicator dot */}
              {isActive && <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse'></div>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const AuctionLink = ({ campaign }: { campaign: any }) => {
  const [copied, setCopied] = useState(false);
  const campaignUrl = `https://www.littlepawsdr.org/campaigns/${campaign?.campaign?.customCampaignLink}/auction`;

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(campaignUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className='col-span-12 md:col-span-6 flex justify-end h-fit'>
      <div className='bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-4 w-full md:w-fit shadow-lg hover:shadow-xl transition-all duration-300'>
        {/* URL Display */}
        <div className='bg-white rounded-lg p-3 mb-3 border border-gray-200'>
          <div className='flex items-center gap-2 mb-2'>
            <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center'>
              <ExternalLink className='w-3 h-3 text-blue-600' />
            </div>
            <span className='text-xs text-gray-600 font-Matter-Medium'>Campaign URL</span>
          </div>
          <p className='text-sm text-gray-800 font-Matter-Regular break-all mb-2'>{campaignUrl}</p>

          {/* Action Buttons */}
          <div className='flex gap-2'>
            <button
              onClick={copyUrl}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-Matter-Medium transition-all duration-200 ${
                copied ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle className='w-3 h-3' />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className='w-3 h-3' />
                  Copy
                </>
              )}
            </button>

            <Link
              to={`/campaigns/${campaign?.campaign?.customCampaignLink}/auction`}
              className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-Matter-Medium transition-all duration-200 hover:no-underline hover:scale-105'
            >
              <Eye className='w-3 h-3' />
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusAndTitleSection = ({ isLoading, campaign, status }: { isLoading: boolean; campaign: any; status: string }) => (
  <div className='col-span-12 md:col-span-6'>
    {isLoading ? (
      <div className='flex items-center justify-center h-32 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200'>
        <div className='flex flex-col items-center gap-3'>
          <TailwindSpinner color='fill-blue-600' wAndH='w-8 h-8' />
          <span className='text-gray-600 text-sm font-Matter-Regular'>Loading campaign...</span>
        </div>
      </div>
    ) : (
      <Fragment>
        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-Matter-Medium mb-3 ${
            status === 'Pre-Campaign'
              ? 'text-blue-700 bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300'
              : status === 'Active Campaign'
              ? 'text-green-700 bg-gradient-to-r from-green-100 to-green-200 border border-green-300'
              : 'text-gray-600 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300'
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              status === 'Pre-Campaign' ? 'bg-blue-500' : status === 'Active Campaign' ? 'bg-green-500' : 'bg-gray-500'
            }`}
          ></div>
          {status}
        </div>

        {/* Campaign Title */}
        <div className='flex items-center gap-3 mb-3'>
          <h1 className='text-3xl font-Matter-Bold text-gray-900'>{campaign?.campaign?.title}</h1>
        </div>

        {/* Auction ID */}
        <div className='flex items-center gap-2 text-gray-600'>
          <Calendar className='w-4 h-4' />
          <span className='text-sm font-Matter-Regular'>
            Auction ID: <span className='font-Matter-Medium text-gray-800'>{campaign?.campaign?.auction?._id}</span>
          </span>
        </div>

        {/* Quick Stats */}
        <div className='flex flex-col xs:flex-row xs:items-center gap-y-4 xs:gap-4 mt-4'>
          {/* Campaign Status with dynamic colors and text */}
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              campaign?.campaign?.campaignStatus === 'Active Campaign'
                ? 'bg-green-50'
                : campaign?.campaign?.campaignStatus === 'Pre-Campaign'
                ? 'bg-yellow-50'
                : 'bg-gray-50'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                campaign?.campaign?.campaignStatus === 'Active Campaign'
                  ? 'bg-green-500 animate-pulse'
                  : campaign?.campaign?.campaignStatus === 'Pre-Campaign'
                  ? 'bg-yellow-500 animate-bounce'
                  : 'bg-gray-500'
              }`}
            ></div>
            <span
              className={`text-xs font-Matter-Medium ${
                campaign?.campaign?.campaignStatus === 'Active Campaign'
                  ? 'text-green-700'
                  : campaign?.campaign?.campaignStatus === 'Pre-Campaign'
                  ? 'text-yellow-700'
                  : 'text-gray-700'
              }`}
            >
              {campaign?.campaign?.campaignStatus === 'Active Campaign'
                ? 'Live Auction'
                : campaign?.campaign?.campaignStatus === 'Pre-Campaign'
                ? 'Starting Soon'
                : 'Offline'}
            </span>
          </div>

          {/* Total Revenue */}
          <div className='flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full'>
            <span className='text-emerald-700 text-xs font-Matter-Medium'>
              ${campaign?.campaign?.totalCampaignRevenue?.toFixed(2) || '0.00'} Revenue
            </span>
          </div>

          {/* Bidders Count */}
          <div className='flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full'>
            <span className='text-purple-700 text-xs font-Matter-Medium'>{campaign?.campaign?.auction?.bidders?.length || 0} Bidders</span>
          </div>

          {/* Items Count */}
          <div className='flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full'>
            <span className='text-blue-700 text-xs font-Matter-Medium'>{campaign?.campaign?.auction?.items?.length || 0} Items</span>
          </div>
        </div>
      </Fragment>
    )}
  </div>
);

const Navbar = ({ id, pathname, isLoading }: { id: string; pathname: string; isLoading?: any }) => {
  const campaign = useAppSelector((state: RootState) => state.campaign);
  const status = campaign?.campaign?.campaignStatus;

  return (
    <div className='flex flex-col mb-6 p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl border border-gray-200 shadow-lg'>
      {/* Back Button */}
      <Link to='/admin/campaigns' className='flex items-center gap-2 mb-4 text-sm font-medium text-gray-600 hover:text-gray-900 w-fit'>
        <ArrowLeft className='w-4 h-4' />
        Back to Campaigns
      </Link>

      {/* Header Section */}
      <div className='grid grid-cols-12 gap-6 mb-6'>
        <StatusAndTitleSection isLoading={isLoading} campaign={campaign} status={status} />
        <AuctionLink campaign={campaign} />
      </div>

      {/* Navigation Links */}
      <NavLinkSection id={id} pathname={pathname} />
    </div>
  );
};

export default Navbar;
