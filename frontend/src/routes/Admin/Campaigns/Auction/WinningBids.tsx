import { RootState, useAppDispatch, useAppSelector } from '../../../../redux/toolkitStore';
import { Fragment, useEffect } from 'react';
import { setInitialArray, setSearchQuery } from '../../../../redux/features/campaign/campaignSlice';
import AwesomeIcon from '../../../../components/common/AwesomeIcon';
import { magnifyingGlassIcon } from '../../../../icons';
import EmptyTable from '../../../../components/tables/EmptyTable';
import WinningBidsTable from '../../../../components/tables/WinningBidsTable';

const WinningBids = () => {
  const dispatch = useAppDispatch();
  const campaign = useAppSelector((state: RootState) => state.campaign);
  const winningBids = campaign?.campaign?.auction?.winningBids;
  const noWinningBids = winningBids?.length === 0;
  const filteredData = campaign.filteredArray;
  const winningBidsAmout = filteredData?.length;

  useEffect(() => {
    dispatch(setInitialArray({ arrayToFilter: winningBids }));
  }, [winningBids, dispatch]);

  const handleSearch = (e: any) => {
    dispatch(setSearchQuery({ text: e.target.value, arrayToFilter: winningBids }));
  };

  return (
    <Fragment>
      <div className='font-Matter-Medium text-2xl mb-3.5'>
        Winning Bidders <span className='ml-1 text-sm'>(&nbsp;{winningBidsAmout}&nbsp;)</span>
      </div>
      <div className='grid grid-cols-6 h-10'>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border-[1px] border-slate-200 rounded-md bg-white py-2 px-3'>
          <AwesomeIcon icon={magnifyingGlassIcon} className='w-4 h-4 text-gray-300' />
          <input onChange={handleSearch} className='w-full h-full focus:outline-0 rounded-md ml-2' placeholder='Search' />
        </div>
      </div>
      <div className='bg-white w-full mt-3 border-[1px] border-slate-200 rounded-xl'>
        {noWinningBids ? (
          <EmptyTable text='No winning bids' />
        ) : (
          <div className='rounded-xl bg-white overflow-x-scroll md:overflow-x-hidden relative'>
            <WinningBidsTable filteredData={filteredData} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default WinningBids;
