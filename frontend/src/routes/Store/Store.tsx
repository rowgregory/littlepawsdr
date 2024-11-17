import { Fragment } from 'react';
import StoreItem from '../../components/store/StoreItem';
import ShopHigh from '../../components/assets/shop-high.jpg';
import { useSelector } from 'react-redux';
import NoItemsAvailable from '../../components/store/NoItemsAvailable';
import { useAppDispatch } from '../../redux/toolkitStore';
import { setOpenFilterDrawer } from '../../redux/features/merchAndEcardSlice';
import HorizontalLoader from '../../components/Loaders/HorizontalLoader';
import { useGetMerchAndEcardsQuery } from '../../redux/services/merchAndEcardsApi';
import PageBanner from '../../components/common/PageBanner';

const Store = () => {
  const dispatch = useAppDispatch();
  const { filteredItems, noFilteredItems, noItemsAvailableMessage, noItems } = useSelector(
    (state: any) => state.merchAndEcards
  );
  const { isLoading } = useGetMerchAndEcardsQuery();

  return (
    <Fragment>
      <PageBanner imgSrc={ShopHigh} title='Merch & Ecards' />
      {isLoading && <HorizontalLoader />}
      <div className='px-3 mt-12 mb-32'>
        <div className='max-w-screen-2xl w-full mx-auto'>
          {noItems ? (
            <NoItemsAvailable />
          ) : (
            <div className='flex flex-col'>
              <div className='flex items-center mb-12'>
                <button
                  onClick={() => dispatch(setOpenFilterDrawer())}
                  className='flex items-center gap-2 border-[1px] border-slate-200 rounded-lg px-3 py-2.5 font-Matter-Medium uppercase text-xs'
                >
                  <i className='fas fa-filter'></i>
                  <p>Filter</p>
                </button>
              </div>
              <div className='grid grid-cols-12 xl:grid-cols-10 gap-y-10 xs:gap-4 md:gap-y-10'>
                {noFilteredItems ? (
                  <p className='col-span-12 font-Matter-Regular'>{noItemsAvailableMessage}</p>
                ) : (
                  filteredItems?.map((item: any) => <StoreItem key={item._id} item={item} />)
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Store;
