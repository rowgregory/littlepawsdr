import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useCreateCampaignMutation,
  useGetCampaignsForAdminViewQuery,
} from '../../../redux/services/campaignApi';
import { RootState } from '../../../redux/toolkitStore';
import MagnifyingGlass from '../../../components/svg/MagnifyingGlass';
import GreenRotatingTransparentCircle from '../../../components/Loaders/GreenRotatingTransparentCircle';
import toFixed from '../../../utils/toFixed';
import CreateCampaignModal from '../../../components/modals/CreateCampaignModal';

const Navbar = ({ handleOpen, campaigns }: { handleOpen: any; campaigns: number }) => (
  <header className='d-flex justify-content-between align-items-center w-100 mb-3'>
    <div className='d-flex align-items-center'>
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

const CampaignTable = ({ campaigns, navigate, handleOpen }: any) => {
  const noCampaigns = campaigns?.length === 0;
  return noCampaigns ? (
    <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10'>
      <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
        <MagnifyingGlass />
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
          <MagnifyingGlass />
          <input
            className='w-full h-full focus:outline-0 rounded-md ml-2'
            placeholder='Search'
          />
        </div>
      </div>
      <div className='rounded-xl bg-white overflow-x-scroll lg:overflow-x-hidden relative'>
        <table className='w-full'>
          <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
            <tr className='bg-zinc-50'>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2'>
                <div className='text-sm flex whitespace-nowrap items-center gap-2'>
                  Campaign
                </div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2'>
                <div className=' text-sm flex whitespace-nowrap items-center gap-2'>
                  Supporters
                </div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2'>
                <div className=' text-sm flex whitespace-nowrap items-center gap-2'>
                  Raised
                </div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2'>
                <div className=' text-sm flex whitespace-nowrap items-center gap-2'>
                  Status
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns &&
              campaigns?.map((campaign: any) => (
                <tr
                  key={campaign?._id}
                  onClick={() => navigate(`/admin/campaigns/${campaign?._id}/details`)}
                  className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
                >
                  <td className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center whitespace-nowrap'>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      {campaign?.title}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      {campaign?.supporters}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      ${toFixed(campaign?.totalCampaignRevenue)}
                    </p>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      {campaign?.campaignStatus}
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

const Campaigns = () => {
  const navigate = useNavigate();
  const [show, showModal] = useState(false);
  const [text, setText] = useState('');
  const campaign = useSelector((state: RootState) => state.campaign);
  const handleOpen = () => showModal(true);
  const handleClose = () => showModal(false);

  const { isLoading } = useGetCampaignsForAdminViewQuery();
  const [createCampaign, { isLoading: loadingCreate }] = useCreateCampaignMutation();

  const handleCreateCampaign = async () => {
    await createCampaign({ text })
      .unwrap()
      .then(({ campaignId }: { campaignId: string }) =>
        navigate(`/admin/campaigns/${campaignId}/details`)
      )
      .catch((err: any) => err);
  };

  return (
    <Fragment>
      {isLoading && <GreenRotatingTransparentCircle />}
      <CreateCampaignModal
        show={show}
        handleClose={handleClose}
        text={text}
        setText={setText}
        handleCreateCampaign={handleCreateCampaign}
        loadingCreate={loadingCreate}
      />
      <div className='bg-zinc-50 pt-16 md:pt-20 px-[8px] md:px-[20px] pb-3 min-h-screen'>
        <div className='max-w-screen-lg w-full mx-auto'>
          <Navbar
            handleOpen={handleOpen}
            campaigns={campaign?.campaignsForAdminView?.length}
          />
          <div className='bg-white w-full mt-3 border-[1px] border-slate-200 rounded-xl'>
            <CampaignTable
              campaigns={campaign?.campaignsForAdminView}
              navigate={navigate}
              handleOpen={handleOpen}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Campaigns;
