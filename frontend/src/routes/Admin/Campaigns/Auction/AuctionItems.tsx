import { Link, useParams } from 'react-router-dom';
import MagnifyingGlass from '../../../../components/svg/MagnifyingGlass';
import { useSelector } from 'react-redux';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import useOutsideDetect from '../../../../hooks/useOutsideDetect';
import { RootState, useAppDispatch } from '../../../../redux/toolkitStore';
import DeleteModal from '../../../../components/DeleteModal';
import { useDeleteAuctionItemMutation } from '../../../../redux/services/campaignApi';
import useDeleteModal from '../../../../hooks/useDeleteModal';
import { setInitialArray, setSearchQuery } from '../../../../redux/features/campaign/campaignSlice';
import AuctionItemsTable from '../../../../components/tables/AuctionItemsTable';

const AuctionItems = () => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState('');
  const { id: auctionItemId } = useParams();
  const campaign = useSelector((state: RootState) => state.campaign);
  const actionMenuRef = useRef(null) as any;
  const [itemToBeEdited, setItemToBeEdited] = useState({ open: false, item: {} }) as any;
  const auctionId = campaign?.campaign?.auction?._id;
  const auctionItems = campaign?.campaign?.auction?.items;
  const noAuctionItems = auctionItems?.length === 0;
  const filteredData = campaign?.filteredArray;
  const auctionItemsAmount = filteredData?.length;

  const { openModal, show, closeModal } = useDeleteModal();

  const closeActionMenu = useCallback(() => {
    setItemToBeEdited({ open: false, item: {} });
  }, []);

  useOutsideDetect(actionMenuRef, closeActionMenu);

  const [deleteAuctionItem, { isLoading: loadingDelete }] = useDeleteAuctionItemMutation();

  useEffect(() => {
    dispatch(setInitialArray({ arrayToFilter: auctionItems }));
  }, [auctionItems, dispatch]);

  const handleSearch = (e: any) => {
    dispatch(setSearchQuery({ text: e.target.value, arrayToFilter: auctionItems }));
  };

  return (
    <Fragment>
      <DeleteModal
        type='Auction Item'
        id={id}
        deleteDocument={deleteAuctionItem}
        loading={loadingDelete}
        hook={{ openModal, show, closeModal }}
      />
      <div className='font-Matter-Medium text-2xl mb-3.5'>
        Items<span className='ml-1 text-sm'>(&nbsp;{auctionItemsAmount}&nbsp;)</span>
      </div>
      <div className='grid grid-cols-12 h-10 justify-between'>
        <div className='col-span-7 md:col-span-4 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-[16px] '>
          <MagnifyingGlass />
          <input
            onChange={handleSearch}
            className='w-full h-full focus:outline-0 rounded-md ml-2'
            placeholder='Search'
          />
        </div>
        <Link
          to={`/admin/campaigns/${auctionItemId}/auction/items/new`}
          className='col-span-4 col-start-9 md:col-span-2 duration-200 md:col-start-11 hover:no-underline text-center flex justify-center items-center font-Matter-Medium bg-blue-600 rounded-lg text-sm text-white py-2 hover:bg-blue-500'
          state={{ isEditMode: false, auctionId }}
        >
          Add item
        </Link>
      </div>
      <div className='bg-white w-full mt-3 border border-slate-100 rounded-xl'>
        {noAuctionItems ? (
          <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto py-10'>
            <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
              <MagnifyingGlass />
            </div>
            <div className='font-Matter-Regular my-2'>No auction items</div>
            <Link
              className='px-4 text-center duration-200 font-Matter-Medium bg-blue-600 rounded-lg text-sm w-44 text-white py-2 hover:no-underline hover:bg-blue-500 h-10 flex items-center justify-center'
              to={`/admin/campaigns/${auctionItemId}/auction/items/new`}
              state={{ isEditMode: false, auctionId }}
            >
              Add item
            </Link>
          </div>
        ) : (
          <div className='rounded-xl bg-white overflow-x-scroll sm:overflow-x-hidden relative'>
            <AuctionItemsTable
              filteredData={filteredData}
              setId={setId}
              itemToBeEdited={itemToBeEdited}
              actionMenuRef={actionMenuRef}
              openModal={openModal}
              setItemToBeEdited={setItemToBeEdited}
              auctionItemId={auctionItemId}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AuctionItems;
