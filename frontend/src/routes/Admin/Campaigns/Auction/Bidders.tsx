import { useSelector } from 'react-redux';
import MagnifyingGlass from '../../../../components/svg/MagnifyingGlass';
import { RootState, useAppDispatch } from '../../../../redux/toolkitStore';
import { Fragment, useEffect } from 'react';
import BiddersTable from '../../../../components/tables/BiddersTable';
import EmptyTable from '../../../../components/tables/EmptyTable';
import { setInitialArray, setSearchQuery } from '../../../../redux/features/campaign/campaignSlice';

const Bidders = () => {
  const dispatch = useAppDispatch();
  const campaign = useSelector((state: RootState) => state.campaign);
  const bidders = campaign?.campaign?.auction?.bidders;
  const noBidders = bidders?.length === 0;
  const filteredData = campaign.filteredArray;
  const biddersAmount = filteredData?.length;

  useEffect(() => {
    dispatch(setInitialArray({ arrayToFilter: bidders }));
  }, [bidders, dispatch]);

  const handleSearch = (e: any) => {
    dispatch(setSearchQuery({ text: e.target.value, arrayToFilter: bidders }));
  };

  return (
    <Fragment>
      <h1 className='font-Matter-Medium text-2xl mb-3.5'>
        Bidders<span className='ml-1 text-sm'>(&nbsp;{biddersAmount}&nbsp;)</span>
      </h1>
      <div className='grid grid-cols-6 h-10'>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border-[1px] border-slate-200 rounded-md bg-white py-2 px-3'>
          <MagnifyingGlass />
          <input
            onChange={handleSearch}
            className='w-full h-full focus:outline-0 rounded-md ml-2'
            placeholder='Search'
          />
        </div>
      </div>
      <div className='bg-white w-full mt-3 border-[1px] border-slate-200 rounded-xl'>
        {noBidders ? (
          <EmptyTable text='No bidders' />
        ) : (
          <div className='rounded-xl bg-white overflow-x-scroll xl:overflow-x-hidden relative'>
            <BiddersTable filteredData={filteredData} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Bidders;
