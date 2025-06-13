import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { clearInputs, createFormActions, setInputs } from '../../redux/features/form/formSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { useCreateAuctionItemMutation } from '../../redux/services/campaignApi';
import AuctionItemForm from '../forms/campaign/AuctionItemForm';
import { resetAuctionItem, setCloseAuctionItemCreateDrawer } from '../../redux/features/campaign/campaignSlice';
import validateAuctionItemForm from '../../validations/validateAuctionItemForm';
import { useEffect } from 'react';

const AuctionItemCreateDrawer = () => {
  const dispatch = useAppDispatch();
  const campaign = useAppSelector((state: RootState) => state.campaign);
  const [createAuctionItem, { isLoading }] = useCreateAuctionItemMutation();
  const { auctionItemCreateForm } = useAppSelector((state: RootState) => state.form);
  const { handleInput, handleToggle, setErrors } = createFormActions('auctionItemCreateForm', dispatch);

  useEffect(() => {
    dispatch(setInputs({ formName: 'auctionItemCreateForm', data: { requiresShipping: true } }));
  }, [dispatch]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isValid = validateAuctionItemForm(auctionItemCreateForm?.inputs, setErrors);
    if (!isValid) return;

    try {
      await createAuctionItem({
        auction: campaign.campaign.auction._id,
        photos: auctionItemCreateForm?.inputs?.photos,
        name: auctionItemCreateForm?.inputs?.name,
        description: auctionItemCreateForm?.inputs?.description,
        sellingFormat: auctionItemCreateForm?.inputs?.sellingFormat,
        requiresShipping: auctionItemCreateForm?.inputs?.requiresShipping,
        shippingCosts: auctionItemCreateForm?.inputs?.shippingCosts,
        ...(auctionItemCreateForm?.inputs?.sellingFormat === 'fixed' && {
          buyNowPrice: auctionItemCreateForm?.inputs?.buyNowPrice,
          isFixed: true,
          isAuction: false,
          isDigital: auctionItemCreateForm?.inputs?.isDigital,
          totalQuantity: auctionItemCreateForm?.inputs?.totalQuantity,
          itemBtnText: 'Buy Now',
          totalBids: null,
        }),
        ...(auctionItemCreateForm?.inputs?.sellingFormat === 'auction' && {
          startingPrice: auctionItemCreateForm?.inputs?.startingPrice,
          currentBid: auctionItemCreateForm?.inputs?.startingPrice,
          minimumBid: auctionItemCreateForm?.inputs?.startingPrice,
          isFixed: false,
          isAuction: true,
          isDigital: false,
          totalBids: 0,
          totalQuantity: 1,
          itemBtnText: 'Place Bid',
        }),
      }).unwrap();

      closeAuctionItemDrawer();
    } catch (error) {}
  };

  const closeAuctionItemDrawer = () => {
    dispatch(clearInputs({ formName: 'auctionItemCreateForm' }));
    dispatch(resetAuctionItem());
    dispatch(setCloseAuctionItemCreateDrawer());
  };

  return (
    <AnimatePresence>
      {campaign.toggleAuctionItemCreateDrawer && (
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
              inputs={auctionItemCreateForm?.inputs}
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

export default AuctionItemCreateDrawer;
