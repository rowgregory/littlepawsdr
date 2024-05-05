import { useSelector } from 'react-redux';
import JumpingRumpLoader from '../../Loaders/JumpingRopLoader';
import { RootState } from '../../../redux/toolkitStore';

const AdoptionApplicationFeeRevenue = () => {
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const loading = dashboard.loading;
  const data = dashboard.currentYearData;

  return (
    <div className='flex w-full items-center justify-between relative py-0 px-3 h-full'>
      <p className='font-Rust text-sm'>Adoption Application Fee Revenue</p>
      <div className='text-3xl font-Rust text-pink-400'>
        {loading ? (
          <div className='flex mt-2 mx-2'>
            <JumpingRumpLoader color='#fc5b82' />
          </div>
        ) : (
          `$${data?.revenue?.adoptionFeesRevenue}`
        )}
      </div>
    </div>
  );
};

export default AdoptionApplicationFeeRevenue;
