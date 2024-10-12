import { FC, MouseEventHandler } from 'react';
import toFixed from '../../utils/toFixed';
import { NavigateFunction } from 'react-router-dom';

interface CampaignTableAdminProps {
  campaigns: any;
  navigate: NavigateFunction;
  handleOpen: MouseEventHandler<HTMLButtonElement>;
}

const CampaignTableAdmin: FC<CampaignTableAdminProps> = ({ campaigns, navigate, handleOpen }) => {
  return (
    <table className='w-full'>
      <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
        <tr className='bg-zinc-50'>
          <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2'>
            <div className='text-sm flex whitespace-nowrap items-center gap-2'>Campaign</div>
          </th>
          <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2'>
            <div className=' text-sm flex whitespace-nowrap items-center gap-2'>Supporters</div>
          </th>
          <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2'>
            <div className=' text-sm flex whitespace-nowrap items-center gap-2'>Raised</div>
          </th>
          <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2'>
            <div className=' text-sm flex whitespace-nowrap items-center gap-2'>Status</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {campaigns?.map((campaign: any) => (
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
  );
};
export default CampaignTableAdmin;
