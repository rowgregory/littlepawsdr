import { FormEvent, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useCreateCampaignMutation,
  useGetCampaignsForAdminViewQuery,
} from '../../../redux/services/campaignApi';
import { RootState } from '../../../redux/toolkitStore';
import CreateCampaignModal from '../../../components/modals/CreateCampaignModal';
import CampaignTableAdmin from '../../../components/tables/CampaignTableAdmin';

const Navbar = ({ handleOpen, campaigns }: { handleOpen: any; campaigns: number }) => (
  <header className='flex flex-col sm:flex-row sm:justify-between sm:items-center w-full mb-3'>
    <div className='flex items-center'>
      <h1 className='text-2xl font-Matter-Medium mb-0'>Campaigns</h1>
      <div className='bg-gray-300 mx-3 w-[1px] h-6'></div>
      <p className='font-Matter-Medium mb-0'>{campaigns}</p>
    </div>
    <button
      className='text-white bg-yellow-to-green border-none py-2 px-3 font-Matter-Regular duration-300 rounded-md hover:shadow-lg'
      onClick={handleOpen}
    >
      New Campaign
    </button>
  </header>
);

const Campaigns = () => {
  const navigate = useNavigate();
  const [show, showModal] = useState(false);
  const [text, setText] = useState('');
  const campaign = useSelector((state: RootState) => state.campaign);
  const handleOpen = () => showModal(true);
  const handleClose = () => showModal(false);
  const noCampaigns = campaign?.campaignsForAdminView?.length === 0;
  const { refetch } = useGetCampaignsForAdminViewQuery();
  const [createCampaign, { isLoading: loadingCreate }] = useCreateCampaignMutation();

  const handleCreateCampaign = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { campaignId } = await createCampaign({ text }).unwrap();
      refetch();
      navigate(`/admin/campaigns/${campaignId}/details`);
    } catch (err) {
      console.error('Error creating campaign:', err);
    }
  };

  return (
    <Fragment>
      <CreateCampaignModal
        show={show}
        handleClose={handleClose}
        text={text}
        setText={setText}
        handleCreateCampaign={handleCreateCampaign}
        loadingCreate={loadingCreate}
      />
      <div className='bg-zinc-50 pt-16 md:pt-20 px-[8px] md:px-5 pb-3 min-h-screen'>
        <div className='max-w-screen-lg w-full mx-auto'>
          <Navbar handleOpen={handleOpen} campaigns={campaign?.campaignsForAdminView?.length} />
          <div className='bg-white w-full mt-3 border-[1px] border-slate-200 rounded-xl'>
            {noCampaigns ? (
              <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10'>
                <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
                  <i className='fas fa-search text-gray-300 text-sm'></i>
                </div>
                <div className='font-Matter-Medium my-2'>No campaigns</div>
                <button
                  className='text-white bg-yellow-to-green border-none py-2 px-3 font-Matter-Regular duration-300 rounded-md hover:shadow-lg'
                  onClick={handleOpen}
                >
                  New Campaign
                </button>
              </div>
            ) : (
              <Fragment>
                <div className='grid grid-cols-6 p-3'>
                  <div className='col-span-4 md:col-span-2 flex items-center font-Matter-Light border-[1px] border-slate-200 rounded-md bg-white py-2 px-3'>
                    <i className='fas fa-search text-gray-300 text-sm'></i>
                    <input
                      className='w-full h-full focus:outline-0 rounded-md ml-2'
                      placeholder='Search'
                    />
                  </div>
                </div>
                <div className='rounded-xl bg-white overflow-x-scroll lg:overflow-x-hidden relative'>
                  <CampaignTableAdmin
                    campaigns={campaign?.campaignsForAdminView}
                    navigate={navigate}
                    handleOpen={handleOpen}
                  />
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Campaigns;
