import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Award } from 'lucide-react';
import CreateCampaignModal from '../../../components/modals/CreateCampaignModal';
import { useCreateCampaignMutation, useGetCampaignsForAdminViewQuery } from '../../../redux/services/campaignApi';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppSelector } from '../../../redux/toolkitStore';
import DesktopHeader from '../../../components/admin/campaigns/DesktopHeader';
import DesktopStatsCards from '../../../components/admin/campaigns/DesktopStatsCards';
import DesktopCampaignsGrid from '../../../components/admin/campaigns/DesktopCampaignsGrid';
import MobileStats from '../../../components/admin/campaigns/MobileStats';
import MobileCampaignsList from '../../../components/admin/campaigns/MobileCampaignsList';

const CampaignsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [show, showModal] = useState(false);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const campaign = useAppSelector((state: RootState) => state.campaign);

  useGetCampaignsForAdminViewQuery();
  const [createCampaign, { isLoading: loadingCreate }] = useCreateCampaignMutation();

  const handleCreateCampaign = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const { campaign } = await createCampaign({ text }).unwrap();
      navigate(`/admin/campaigns/${campaign._id}/details`);
    } catch {}
  };

  const transformedCampaigns =
    campaign?.campaignsForAdminView
      ?.map((camp: any) => {
        // Determine priority based on status
        let priority = 3; // Default to 3 for Post-Campaign
        let isLive = false;

        if (camp.campaignStatus === 'Active Campaign') {
          priority = 1;
          isLive = true;
        } else if (camp.campaignStatus === 'Pre-Campaign') {
          priority = 2;
        } else if (camp.campaignStatus === 'Post-Campaign') {
          priority = 3;
        }

        return {
          id: camp._id,
          title: camp.title,
          supporters: camp.supporters || 0,
          raised: camp.totalCampaignRevenue || 0,
          status: camp.campaignStatus,
          startDate: camp?.auction?.settings?.startDate,
          category: 'Campaign',
          progress: camp.goal && camp.goal > 0 ? Math.round((camp.totalCampaignRevenue / camp.goal) * 100) : 0,
          isLive: isLive,
          endDate: camp?.auction?.settings?.endDate,
          priority: priority,
          timeLeft:
            camp.campaignStatus === 'Active Campaign' ? 'Active now' : camp.campaignStatus === 'Pre-Campaign' ? 'Starting soon' : 'Auction ended',
          originalStatus: camp.campaignStatus, // Keep original for reference
          customCampaignLink: camp.customCampaignLink,
        };
      })
      .reverse() || [];

  // Sort campaigns by priority (live first, then upcoming, then past)
  const sortedCampaigns = [...transformedCampaigns].sort((a, b) => a.priority - b.priority);

  const totalRaised = campaign?.campaignsForAdminView?.reduce((sum, campaign) => sum + campaign.totalCampaignRevenue, 0);
  const totalSupporters = campaign?.campaignsForAdminView?.reduce((sum, campaign) => sum + campaign.supporters, 0);
  const activeCampaigns = campaign?.campaignsForAdminView?.filter(
    (c) => c.campaignStatus === 'Active Campaign' || c.auction.settings.status === 'LIVE'
  ).length;

  const filteredCampaigns = sortedCampaigns.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <CreateCampaignModal
        show={show}
        handleClose={() => showModal(false)}
        text={text}
        setText={setText}
        handleCreateCampaign={handleCreateCampaign}
        loadingCreate={loadingCreate}
      />
      <div className='min-h-dvh w-full'>
        {/* Mobile Header */}
        <div className='md:hidden bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <h1 className='text-xl font-bold text-gray-900'>Campaigns</h1>
              <span className='bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full'>{sortedCampaigns.length}</span>
            </div>
            <motion.button
              className='bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-lg shadow-lg'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className='w-5 h-5' />
            </motion.button>
          </div>
        </div>

        {/* Desktop/Tablet Container */}
        <div className='hidden md:block p-6'>
          <div className='max-w-7xl mx-auto'>
            {/* Desktop Header */}
            <DesktopHeader sortedCampaigns={sortedCampaigns} showModal={showModal} />

            {/* Desktop Stats Cards */}
            <DesktopStatsCards activeCampaigns={activeCampaigns} totalRaised={totalRaised} totalSupporters={totalSupporters} />

            {/* Desktop Search and Filters */}
            <motion.div
              className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4'>
                <div className='relative flex-1 max-w-md'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <input
                    type='text'
                    placeholder='Search campaigns...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  />
                </div>
              </div>
            </motion.div>

            {/* Desktop Campaigns Grid */}
            <DesktopCampaignsGrid filteredCampaigns={filteredCampaigns} />
          </div>
        </div>

        {/* Mobile Content */}
        <div className='md:hidden'>
          {/* Mobile Stats - Horizontal Scroll */}
          <MobileStats activeCampaigns={activeCampaigns} totalRaised={totalRaised} totalSupporters={totalSupporters} />

          {/* Mobile Search and Filter */}
          <div className='px-4 pb-4'>
            <div className='bg-white rounded-xl p-4 shadow-lg border border-gray-100'>
              <div className='space-y-3'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <input
                    type='text'
                    placeholder='Search campaigns...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
                  />
                </div>
                <div className='flex items-center space-x-2'>
                  <Filter className='w-4 h-4 text-gray-400' />
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className='flex-1 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm'
                  >
                    <option value='all'>All Status</option>
                    <option value='active'>Active</option>
                    <option value='pre-campaign'>Pre-Campaign</option>
                    <option value='post-campaign'>Post-Campaign</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Campaigns List */}
          <MobileCampaignsList filteredCampaigns={filteredCampaigns} />
        </div>

        {/* Empty State */}
        {campaign?.campaignsForAdminView?.length === 0 && (
          <motion.div
            className='text-center py-16 flex justify-center flex-col items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Award className='w-16 h-16 text-gray-300 mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>No campaigns yet</h3>
            <p className='text-gray-600 mb-6'>Get started by creating your first campaign</p>
            <motion.button
              onClick={() => showModal(true)}
              className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 w-fit'
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Plus className='w-5 h-5' />
              <span>New Campaign</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default CampaignsDashboard;
