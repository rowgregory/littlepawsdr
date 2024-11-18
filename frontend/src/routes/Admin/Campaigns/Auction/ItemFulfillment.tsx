import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../redux/toolkitStore';
import ItemFulfillmentTable from '../../../../components/tables/ItemFulfillmentTable';
import AwesomeIcon from '../../../../components/common/AwesomeIcon';
import { magnifyingGlassIcon } from '../../../../icons';
import { setInitialArray, setSearchQuery } from '../../../../redux/features/campaign/campaignSlice';
import EmptyTable from '../../../../components/tables/EmptyTable';

const ItemFulfillment = () => {
  const dispatch = useAppDispatch();
  const campaign = useSelector((state: RootState) => state.campaign);
  const itemFulfillments = campaign?.campaign?.auction?.itemFulfillments;
  const noItemsToFulfill = itemFulfillments?.length === 0;
  const filteredData = campaign.filteredArray;
  const itemFulfillmentsAmount = filteredData?.length;

  useEffect(() => {
    dispatch(setInitialArray({ arrayToFilter: itemFulfillments }));
  }, [itemFulfillments, dispatch]);

  const handleSearch = (e: any) => {
    dispatch(setSearchQuery({ text: e.target.value, arrayToFilter: itemFulfillments }));
  };

  return (
    <Fragment>
      <div className='font-Matter-Medium text-2xl mb-3.5'>
        Item Fulfillment{' '}
        <span className='ml-1 text-sm'>(&nbsp;{itemFulfillmentsAmount}&nbsp;)</span>
      </div>
      <div className='grid grid-cols-6 h-10'>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border-[1px] border-slate-200 rounded-md bg-white py-2 px-3'>
          <AwesomeIcon icon={magnifyingGlassIcon} className='w-4 h-4 text-gray-300' />
          <input
            onChange={handleSearch}
            className='w-full h-full focus:outline-0 rounded-md ml-2'
            placeholder='Search'
          />
        </div>
      </div>
      <div className='bg-white w-full mt-3 border-[1px] border-slate-200 rounded-xl'>
        {noItemsToFulfill ? (
          <EmptyTable text='No items to fulfill' />
        ) : (
          <div className='rounded-xl bg-white overflow-x-scroll lg:overflow-x-hidden relative'>
            <ItemFulfillmentTable filteredData={filteredData} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ItemFulfillment;
