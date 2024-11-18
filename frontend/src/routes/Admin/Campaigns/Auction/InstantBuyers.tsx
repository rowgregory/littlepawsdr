import { Fragment, useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../redux/toolkitStore';
import { setInitialArray, setSearchQuery } from '../../../../redux/features/campaign/campaignSlice';
import AwesomeIcon from '../../../../components/common/AwesomeIcon';
import { magnifyingGlassIcon } from '../../../../icons';
import EmptyTable from '../../../../components/tables/EmptyTable';
import InstantBuyersTable from '../../../../components/tables/InstantBuyersTable';

const InstantBuyers = () => {
  const dispatch = useAppDispatch();
  const campaign = useAppSelector((state: RootState) => state.campaign);
  const instantBuyers = campaign?.campaign?.auction?.instantBuyers;
  const noInstantBuyers = instantBuyers?.length === 0;
  const filteredData = campaign.filteredArray;
  const instantBuyersAmount = filteredData?.length;

  useEffect(() => {
    dispatch(setInitialArray({ arrayToFilter: instantBuyers }));
  }, [instantBuyers, dispatch]);

  const handleSearch = (e: any) => {
    dispatch(setSearchQuery({ text: e.target.value, arrayToFilter: instantBuyers }));
  };

  return (
    <Fragment>
      <h1 className='font-Matter-Medium text-2xl mb-3.5'>
        Instant Buyers<span className='ml-1 text-sm'>(&nbsp;{instantBuyersAmount}&nbsp;)</span>
      </h1>
      <div className='grid grid-cols-6 h-10'>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border-[1px] border-slate-200 rounded-md bg-white py-2 px-3'>
          <AwesomeIcon icon={magnifyingGlassIcon} className='w-3 h-3 text-gray-300' />
          <input
            onChange={handleSearch}
            className='w-full h-full focus:outline-0 rounded-md ml-2'
            placeholder='Search'
          />
        </div>
      </div>
      <div className='bg-white w-full mt-3 border-[1px] border-slate-200 rounded-xl'>
        {noInstantBuyers ? (
          <EmptyTable text='No instant buyers' />
        ) : (
          <div className='rounded-xl bg-white overflow-x-scroll xl:overflow-x-hidden relative'>
            <InstantBuyersTable filteredData={filteredData} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default InstantBuyers;
