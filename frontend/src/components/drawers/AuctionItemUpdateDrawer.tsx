import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { setInputs, createFormActions } from '../../redux/features/form/formSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { useUpdateAuctionItemMutation } from '../../redux/services/campaignApi';
import AuctionItemForm from '../forms/campaign/AuctionItemForm';
import { resetAuctionItem, setCloseAuctionItemUpdateDrawer } from '../../redux/features/campaign/campaignSlice';

const AuctionItemUpdateDrawer = () => {
  const dispatch = useAppDispatch();
  const campaign = useAppSelector((state: RootState) => state.campaign);
  const [updateAuctionItem, { isLoading }] = useUpdateAuctionItemMutation();
  const { auctionItemUpdateForm } = useAppSelector((state: RootState) => state.form);
  const { handleInput, handleToggle } = createFormActions('auctionItemUpdateForm', dispatch);

  useEffect(() => {
    if (campaign?.auctionItem?.name) {
      dispatch(
        setInputs({
          formName: 'auctionItemUpdateForm',
          data: campaign?.auctionItem,
        })
      );
    }
  }, [campaign?.auctionItem, dispatch]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await updateAuctionItem({
        id: auctionItemUpdateForm?.inputs?._id,
        auction: campaign.campaign.auction._id,
        name: auctionItemUpdateForm?.inputs?.name,
        description: auctionItemUpdateForm?.inputs?.description,
        photos: auctionItemUpdateForm?.inputs?.photos,
        sellingFormat: auctionItemUpdateForm?.inputs?.sellingFormat,
        requiresShipping: auctionItemUpdateForm?.inputs?.requiresShipping,
        shippingCosts: auctionItemUpdateForm?.inputs?.shippingCosts,
        ...(auctionItemUpdateForm?.inputs?.sellingFormat === 'fixed' && {
          startingPrice: null,
          currentBid: null,
          minimumBid: null,
          buyNowPrice: auctionItemUpdateForm?.inputs?.buyNowPrice,
          isFixed: true,
          isAuction: false,
          isDigital: auctionItemUpdateForm?.inputs?.isDigital,
          itemBtnText: 'Buy Now',
          totalBids: null,
          totalQuantity: auctionItemUpdateForm?.inputs?.totalQuantity,
        }),
        ...(auctionItemUpdateForm?.inputs?.sellingFormat === 'auction' && {
          startingPrice: auctionItemUpdateForm?.inputs?.startingPrice,
          minimumBid: auctionItemUpdateForm?.inputs?.startingPrice,
          currentBid: auctionItemUpdateForm?.inputs?.startingPrice,
          isFixed: false,
          isAuction: true,
          isDigital: false,
          itemBtnText: 'Place Bid',
          totalQuantity: 1,
        }),
      }).unwrap();

      closeAuctionItemDrawer();
    } catch (error) {}
  };

  const closeAuctionItemDrawer = () => {
    dispatch(setInputs({ formName: 'auctionItemUpdateForm', data: null }));
    dispatch(resetAuctionItem());
    dispatch(setCloseAuctionItemUpdateDrawer());
  };

  return (
    <AnimatePresence>
      {campaign.toggleAuctionItemUpdateDrawer && (
        <>
          <motion.div
            key='overlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
            onClick={closeAuctionItemDrawer}
          />
          <motion.div
            key='drawer'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className='min-h-screen fixed w-full md:w-[600px] z-50 top-0 right-0'
          >
            <AuctionItemForm
              inputs={auctionItemUpdateForm?.inputs}
              loading={isLoading}
              handleInput={handleInput}
              handleToggle={handleToggle}
              setInputs={setInputs}
              handleSubmit={handleSubmit}
              onClose={closeAuctionItemDrawer}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuctionItemUpdateDrawer;
