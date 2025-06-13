import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, DollarSign, Users, Trophy, Sparkles } from 'lucide-react';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import { useGetCampaignsQuery } from '../../redux/services/campaignApi';
import { TransparentPurpleLogo } from '../../components/assets';
import DachshundLoader from '../../components/Loaders/DachshundLoader';
import { Campaign } from '../../types/campaign-types';

interface CampaignCardProps {
  campaign: Campaign;
  type: 'upcoming' | 'active' | 'past';
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, type }) => {
  const getStatusColor = () => {
    switch (type) {
      case 'upcoming':
        return 'from-purple-500 to-pink-500';
      case 'active':
        return 'from-green-500 to-teal-500';
      case 'past':
        return 'from-gray-500 to-gray-600';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  const getStatusBadge = () => {
    switch (type) {
      case 'upcoming':
        return { text: 'Coming Soon', bg: 'bg-purple-100 text-purple-800' };
      case 'active':
        return { text: 'Live Now', bg: 'bg-green-100 text-green-800' };
      case 'past':
        return { text: 'Completed', bg: 'bg-gray-100 text-gray-800' };
      default:
        return { text: 'Campaign', bg: 'bg-gray-100 text-gray-800' };
    }
  };

  const statusBadge = getStatusBadge();
  const campaignUrl = `/campaigns/${campaign.customCampaignLink}/auction`;

  return (
    <Link to={campaignUrl} className='block group'>
      <div className='relative mb-6'>
        <div
          className={`absolute inset-0 bg-gradient-to-r ${getStatusColor()} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
        ></div>
        <div className='relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02]'>
          <div className={`bg-gradient-to-r ${getStatusColor()} p-1`}>
            <div className='bg-white rounded-xl p-6'>
              <div className='flex flex-col sm:flex-row gap-6 items-start'>
                <div className='flex-shrink-0'>
                  <div className='w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-3xl'>
                    {type === 'upcoming' ? '🌟' : type === 'active' ? '🔥' : '🏆'}
                  </div>
                </div>

                <div className='flex-1 min-w-0'>
                  <div className='flex flex-wrap gap-2 mb-3'>
                    <span className={`${statusBadge.bg} px-3 py-1 rounded-full text-sm font-semibold`}>{statusBadge.text}</span>
                    {type === 'active' && (
                      <span className='bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold animate-pulse'>🔴 Live</span>
                    )}
                  </div>

                  <h3 className='text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-200'>
                    {campaign.title}
                  </h3>

                  {/* <div className='flex items-center gap-4 text-sm text-gray-600 mb-4'>
                    <div className='flex items-center gap-1'>
                      <Calendar className='w-4 h-4' />
                      <span>{campaign.dates}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock className='w-4 h-4' />
                      <span>{campaign.message}</span>
                    </div>
                  </div> */}

                  {(campaign.goal || campaign.totalCampaignRevenue || campaign.supporters) && (
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                      {campaign.goal && (
                        <div className='bg-purple-50 rounded-lg p-3 text-center'>
                          <DollarSign className='w-4 h-4 text-purple-600 mx-auto mb-1' />
                          <div className='text-xs text-gray-600'>Goal</div>
                          <div className='font-semibold text-gray-800'>${campaign.goal.toLocaleString()}</div>
                        </div>
                      )}

                      {campaign.totalCampaignRevenue && (
                        <div className='bg-green-50 rounded-lg p-3 text-center'>
                          <Trophy className='w-4 h-4 text-green-600 mx-auto mb-1' />
                          <div className='text-xs text-gray-600'>Raised</div>
                          <div className='font-semibold text-gray-800'>${campaign.totalCampaignRevenue.toLocaleString()}</div>
                        </div>
                      )}

                      {campaign.supporters && (
                        <div className='bg-blue-50 rounded-lg p-3 text-center'>
                          <Users className='w-4 h-4 text-blue-600 mx-auto mb-1' />
                          <div className='text-xs text-gray-600'>Supporters</div>
                          <div className='font-semibold text-gray-800'>{campaign.supporters}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className='flex-shrink-0'>
                  <div className='text-right'>
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${getStatusColor()} rounded-full text-white group-hover:scale-110 transition-transform duration-200`}
                    >
                      <span className='text-lg'>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const EmptyState: React.FC<{ type: 'upcoming' | 'active' | 'past' }> = ({ type }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'upcoming':
        return {
          emoji: '🌟',
          title: 'No Upcoming Campaigns',
          description: "We're planning something amazing! Check back soon for new ways to help our dachshund friends.",
        };
      case 'active':
        return {
          emoji: '🐾',
          title: 'No Active Campaigns',
          description: "All quiet on the rescue front! We'll have new campaigns launching soon.",
        };
      case 'past':
        return {
          emoji: '📚',
          title: 'No Past Campaigns',
          description: "This is where we'll showcase all the amazing campaigns we've completed together!",
        };
      default:
        return {
          emoji: '🐕',
          title: 'No Campaigns',
          description: 'Check back soon for new campaigns!',
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300'>
      <div className='text-4xl mb-4'>{content.emoji}</div>
      <h3 className='text-lg font-semibold text-gray-700 mb-2'>{content.title}</h3>
      <p className='text-gray-600 text-sm max-w-sm mx-auto'>{content.description}</p>
    </div>
  );
};

const Campaigns: React.FC = () => {
  const { campaigns } = useAppSelector((state: RootState) => state.campaign);
  const { isLoading } = useGetCampaignsQuery({}, { refetchOnMountOrArgChange: true });

  return (
    <>
      {isLoading && <DachshundLoader />}
      <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50'>
        {/* Header */}
        <div className='relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white'>
          <div className='absolute inset-0 bg-black/20'></div>
          <div className='relative max-w-4xl mx-auto px-6 py-12'>
            <div className='text-center'>
              <Link to='/' className='inline-block mb-6 group'>
                <div className='bg-white/20 backdrop-blur-sm rounded-2xl p-4 group-hover:bg-white/30 transition-all duration-300'>
                  <img src={TransparentPurpleLogo} alt='LPDR Campaign' className='max-w-32 h-auto mx-auto filter brightness-0 invert' />
                </div>
              </Link>
              <h1 className='text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent'>
                Little Paws Dachshund Rescue
              </h1>
              <p className='text-lg text-white/90 mb-8 max-w-2xl mx-auto'>
                Every paw deserves a chance. Join our campaigns and auctions to help rescue dachshunds find their forever homes.
              </p>
              <div className='flex justify-center gap-4 flex-wrap'>
                <div className='bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2'>
                  <Heart className={`w-5 h-5 text-red-300`} />
                  <span>1500+ Lives Saved</span>
                </div>
                <div className='bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2'>
                  <Users className='w-5 h-5 text-blue-300' />
                  <span>Community Driven</span>
                </div>
              </div>
            </div>
          </div>
          <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-50 to-transparent'></div>
        </div>

        <div className='max-w-4xl mx-auto px-6 py-12'>
          {/* Upcoming Campaigns */}
          <section className='mb-12'>
            <div className='flex items-center gap-3 mb-8'>
              <Sparkles className='w-7 h-7 text-purple-600' />
              <h2 className='text-3xl font-bold text-gray-800'>Upcoming Campaigns</h2>
            </div>

            {campaigns?.upcoming?.length === 0 ? (
              <EmptyState type='upcoming' />
            ) : (
              <div className='space-y-6'>
                {campaigns?.upcoming?.map((campaign: Campaign, i: number) => (
                  <CampaignCard key={i} campaign={campaign} type='upcoming' />
                ))}
              </div>
            )}
          </section>

          {/* Active Campaigns */}
          <section className='mb-12'>
            <div className='flex items-center gap-3 mb-8'>
              <Heart className='w-7 h-7 text-red-500 animate-pulse' />
              <h2 className='text-3xl font-bold text-gray-800'>Active Campaigns</h2>
            </div>

            {campaigns?.active?.length === 0 ? (
              <EmptyState type='active' />
            ) : (
              <div className='space-y-6'>
                {campaigns?.active?.map((campaign: Campaign, i: number) => (
                  <CampaignCard key={i} campaign={campaign} type='active' />
                ))}
              </div>
            )}
          </section>

          {/* Past Campaigns */}
          {/* <section className='mb-12'>
            <div className='flex items-center gap-3 mb-8'>
              <Trophy className='w-7 h-7 text-amber-500' />
              <h2 className='text-3xl font-bold text-gray-800'>Past Campaigns</h2>
            </div>

            {campaigns?.past?.length === 0 ? (
              <EmptyState type='past' />
            ) : (
              <div className='space-y-6'>
                {campaigns?.past?.map((campaign: Campaign, i: number) => (
                  <CampaignCard key={i} campaign={campaign} type='past' />
                ))}
              </div>
            )}
          </section> */}

          {/* Call to Action */}
          <section className='text-center'>
            <div className='bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden'>
              <div className='absolute inset-0 bg-black/10'></div>
              <div className='relative'>
                <div className='text-4xl mb-6'>❤️</div>
                <h2 className='text-2xl lg:text-3xl font-bold mb-4'>Ready to Make a Difference?</h2>
                <p className='text-lg text-white/90 mb-8 max-w-2xl mx-auto'>
                  Join our community of dachshund lovers and help us create more success stories. Every contribution counts!
                </p>
                <div className='flex flex-wrap gap-4 justify-center'>
                  <Link
                    to='/donate'
                    className='bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg'
                  >
                    Donate Now
                  </Link>
                  <Link
                    to='/volunteer/volunteer-application'
                    className='border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-200'
                  >
                    Volunteer
                  </Link>
                  <Link
                    to='/adopt'
                    className='border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-200'
                  >
                    Adopt a Dachshund
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Campaigns;
